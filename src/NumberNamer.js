export default class NumberNamer {
  constructor() {
    this.memo = {
      18: [3, 6]
    };
  }

  static handleFlags(...arrays) {
    //look for and process prime flags for each array input individually
    arrays.forEach(subarray => {
      if (subarray[subarray.length - 1] === ")") {
        const lastOpenParenIndex = subarray.findLastIndex((el) => el === `(`)
        subarray.pop()
        subarray.splice(lastOpenParenIndex, 1, "[");
        console.log(subarray);
      }
      //process 1s in numerators and denominators
      if (subarray.length === 1 && subarray[0] === 1) {
        subarray[0] = "ONE";
      }
    });
    return arrays.reduce((accumulator, element, index) => accumulator.concat(index > 0 ? element.toSpliced(0, 0, "/") : element), []);
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
      fractionArray.splice(1, 0, "/");
      return fractionArray.map(element => element === "/" ? element : parseInt(element));
    }
    let num = parseInt(numOrString);
    
    if (num < 0) {
      return ["-1", Math.abs(num)];
    }

    if (num === 1) {
      return [1];
    }

    // if (NumberNamer.isPrime(num)) {
    //   this.memo[num] = ["(", num - 1, ")"];
    //   return this.memo[num];
    // }
    
    let shortest = null;
    let combination = [];
    let factorPairs = (NumberNamer.getFactorPairs(num))

    if (factorPairs.length === 0) {
      // let [factor1, factor2, factor3] = pair;
      shortest = ["("].concat(this.factorShortest(num - 1)).concat([")"]);
    } else for (const pair of factorPairs) {
      let [factor1, factor2] = pair;
      combination = this.factorShortest(factor1).concat(this.factorShortest(factor2));

      if (!shortest || combination.length < shortest.length) {
        shortest = combination;
      }
    }
    
    this.memo[num] = shortest;
    return shortest;

  //   let midIndex = Math.floor((numFactors.length - 1) / 2);
  //   let left = midIndex;
  //   let right = midIndex + 1;
  //   let partialMatch = null;
  //   let nonPrimePartialMatch = null;

  //   //Check array for pairs of roots from the middle outwards
  //   while (left >= 0 || right < numFactors.length) {
  //     const leftPass = NumberNamer.findRoot(numFactors[left]);
  //     const rightPass = NumberNamer.findRoot(numFactors[right]);

  //     if (leftPass && rightPass) {
  //       return [numFactors[left], numFactors[right]];
  //     }

  //     if (!nonPrimePartialMatch && (leftPass || rightPass)) {
  //       if (leftPass && !NumberNamer.isPrime(numFactors[right])) {
  //         nonPrimePartialMatch = [numFactors[left], numFactors[right]];
  //       } else if (rightPass && !NumberNamer.isPrime(numFactors[left])) {
  //         nonPrimePartialMatch = [numFactors[right], numFactors[left]];
  //       }
  //     }
  //     if (!partialMatch && (leftPass || rightPass)) {
  //       partialMatch = [numFactors[right], numFactors[left]];
  //     }

  //     left--;
  //     right++;
  //   }
  //   //If there's no roots in the factors it's prime
  //   return nonPrimePartialMatch || partialMatch || [`(`, num - 1,`)`];
  // }
  }

  // static rootFactors(num) {
  //   //Recursively factor all arrays outputed by factoring
  //   const factorResult = NumberNamer.factorShortest(num);

  //   if (Array.isArray(factorResult)) {
  //     return factorResult.flatMap(NumberNamer.rootFactors);
  //   } else {
  //     return [factorResult];
  //   }
  // }

  showMemo() {
    return this.memo;
  }

  nameNum(num) {
    
    let factorArray = this.factorShortest(num);
    
    //If the input is prime and not the prefix, use a single Un rather than Hen and Sna (kind of hacky)
    if (factorArray.includes("/")) {
      let numerator = factorArray.splice(0, factorArray.indexOf("/"));
      let denominator = factorArray.splice(factorArray.indexOf("/") + 1);
      factorArray = NumberNamer.handleFlags(numerator, denominator);
    } else {
      factorArray = NumberNamer.handleFlags(factorArray);
    }
    
    //turn integer array into single string with word roots
    let baseName = factorArray.reduce((accumulator, element, index) => accumulator + NumberNamer.findRoot(element, factorArray.length - 1 !== index, index > 0), "");
    
    //fix vowels for ease of pronunciation
    const vowelsAO = new RegExp(/[ao]([aeiou])/, "g");
    const vowelsI = new RegExp(/[i][iu]/, "g");
    return baseName.replace(vowelsI, "i").replace(vowelsAO, "$1");
  }
}
