export default class NumberNamer {
  constructor() {
    this.memo = {
    1 : [1],
    "-1" : ["-1"]
    };
  }

  static handleFlags(array) {
    //look for and process prime flags
      let roReplaceNum = 0;
      let replacing = true;

        for (let i = array.length - 1; i >= 0; i--) {
          if (replacing) {
            if (array[i] === `)`) {
              array.splice(i, 1);
              i++;
              roReplaceNum++;
            }
            else {
              replacing = false;
            }
          }
          if (array[i] === `(` && roReplaceNum) {
            array[i] = '[';
            roReplaceNum--;
          }
          // sort all nums smallest to largest
          // else if (/\d/.test(array[i]) && /\d/.test(array[i - 1]) && array[i] < array[i - 1]){
          //   let toSwap = array[i];
          //   array[i] = array[i - 1];
          //   array[i - 1] = toSwap;
          // }
          // ['(', 8, 5, ')', 3]
        }

      //process 1s in numerators and denominators
      if (array.length === 1 && array[0] === 1) {
        array[0] = "ONE";
      }

    return array
  }

  static isPrime(num) {
    if (num === 2 || num === 3) {
      return true;
    }
    if (num === 1 || num % 2 === 0 || num % 3 === 0) {
      return false;
    }
    let rootNum = Math.sqrt(num)
    for (let i = 5; i <= rootNum; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) {
        return false;
      }
    }
    return true;
  }

  static findRoot(num, isPrefix = true, hasPrefix = true) {
    const rootValues = {
      "ONE" : isPrefix ? "uni" : "unary",
      "0" : isPrefix ? "null": (hasPrefix ? "infinital" : "nullary"),
      "-1": isPrefix ? "nega" : "negunary",
      "/" : "vöt",
      "[" : "un",
      "(" : "hen",
      ")" : "sna",
      "2" : isPrefix ? "bi":"binary",
      "3" : isPrefix ? "tri":"trinary",
      "4" : isPrefix ? "tetra":"quaternary",
      "5" : isPrefix ? "penta":"quinary",
      "6" : isPrefix ? "hexa":"sextimal",
      "7" : isPrefix ? "hepta":"septimal",
      "8" : isPrefix ? "octo":"octal",
      "9" : isPrefix ? "enna":"nonary",
      "10" : isPrefix ? "deca": (hasPrefix ? "gesimal" : "decimal"),
      "11" : isPrefix ? "leva":"elevenary",
      "12" : isPrefix ? "doza":"dozenal",
      "13" : isPrefix ? "baker": (hasPrefix ? "ker's dozenal" : "baker's dozenal"),
      "16" : isPrefix ? "tesser":"hex",
      "17" : isPrefix ? "mal":"suboptimal",
      "20" : isPrefix ? "icosi":"vigesimal",
      "36" : isPrefix ? "feta" : "niftimal",
      "100" : isPrefix ? "hecto":"centesimal"
    };
    if (rootValues[num]) {
      return rootValues[num];
    }
  }

  static getFactorPairs(num) {
    
    //Create an array of all the input's factors
    let numFactors = [];
    let upperLimit = Math.floor(Math.sqrt(num));
    for (let i = 2; i <= upperLimit; i++) {
      if (num % i === 0) {
        let factorPair = [i, num / i];
        numFactors.push(factorPair);
        }
      }
      return numFactors;
    }

  factorShortest(numOrString) {

    //Root ints are the only input that's return isn't an array
    if (NumberNamer.findRoot(numOrString)) {
      return [numOrString];
    }

    if (this.memo[numOrString]) return this.memo[numOrString];

    //convert fractions into arrays of [numerator, "/", denominator]
    if (typeof numOrString === "string" && numOrString.includes("/")) {
      let fractionArray = numOrString.split("/", 2);
      return this.factorShortest(fractionArray[0]).concat("/", this.factorShortest(fractionArray[1]));
    }
    let num = parseInt(numOrString);
    
    if (num < 0) {
      return ["-1", this.factorShortest(Math.abs(num))];
    }
    
    let shortest = null;
    let combination = [];
    let factorPairs = (NumberNamer.getFactorPairs(num))

    if (factorPairs.length === 0) {
      shortest = ["("].concat(this.factorShortest(num - 1)).concat([")"]);
    } else for (const pair of factorPairs) {
      let [factor1, factor2] = pair;
      combination = this.factorShortest(factor2).concat(this.factorShortest(factor1));

      if (!shortest || combination.length <= shortest.length) {
        shortest = combination;
      }
    }
    
    this.memo[num] = shortest;
    console.log(this.memo)
    return shortest;
  }

  nameNum(num) {
    
    let factorArray = this.factorShortest(num);
    
    //If the input is prime and not the prefix, use a single Un rather than Hen and Sna (kind of hacky)
    if (factorArray.includes("/")) {
      let numerator = factorArray.slice(0, factorArray.indexOf("/"));
      let denominator = factorArray.slice(factorArray.indexOf("/") + 1);
      factorArray = (numerator.length === 1 ? numerator : NumberNamer.handleFlags(numerator)).concat("/", denominator.length === 1 ? denominator : NumberNamer.handleFlags(denominator));
    } else {
      factorArray = NumberNamer.handleFlags(factorArray);
    }
    console.log(factorArray);
    //turn integer array into single string with word roots
    let baseName = factorArray.reduce((accumulator, element, index) => accumulator + NumberNamer.findRoot(element, factorArray.length - 1 !== index, index > 0), "");
    
    //fix vowels for ease of pronunciation
    const vowelsAO = new RegExp(/[ao]([aeiou])/, "g");
    const vowelsI = new RegExp(/[i][iu]/, "g");
    return baseName.replace(vowelsI, "i").replace(vowelsAO, "$1");
  }
}
