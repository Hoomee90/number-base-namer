export default class NumberNamer {
  constructor(num) {
    this.numberToName = num;
  }

  static handleFlags(...arrays) {
    //look for and process prime flags for each array input individually
    arrays.forEach(subarray => {
      if (subarray[subarray.length - 1] === ")" && subarray[0] === "(") {
        subarray.pop();
        subarray[0] = "[";
      }
      //process 1s in numerators and denominators
      if (subarray.length === 1 && subarray[0] === 1) {
        subarray[0] = "ONE";
      }
    });
    return arrays.reduce((accumulator, element, index) => accumulator.concat(index > 0 ? element.toSpliced(0, 0, "/") : element), []);
  }

  static isPrime(num) {
    if (num === 3) {
      return true;
    }
    if (num === 1 || num % 2 === 0 || num % 3 === 0) {
      return false;
    }
    let rootNum = Math.sqrt(num)
    for (let i = 5; i <= rootNum; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) {
        return true;
      }
    }
    return false;
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
    //Look up both strings or integers
    const numString = (typeof num === "string" ? num : num.toString());
    if (rootValues[numString]) {
      return rootValues[numString];
    }
    return null;
  }

  factorFinder(numOrString = this.numberToName) {
    //Root ints are the only input that's return isn't an array
    if (NumberNamer.findRoot(numOrString)) {
      return numOrString;
    }
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

    if (NumberNamer.isPrime(num)) {
      return ["(", num - 1, ")"];
    }
    
    //Create an array of all the input's factors
    let numFactors = [];
    let upperLimit = Math.floor(Math.sqrt(num));
    for (let i = 1; i <= upperLimit; i++) {
      if (num % i === 0) {
        numFactors.push(i);
        if (i !== num / i) {
          numFactors.push(num / i);
        }
      }
    }
    numFactors.sort((a, b) => a - b);
    let midIndex = Math.floor((numFactors.length - 1) / 2);
    
    if (numFactors.length % 2 !== 0) {
      numFactors.splice(midIndex, 0, numFactors[midIndex]);
    }
    let left = midIndex;
    let right = midIndex + 1;
    let partialMatch = null;

    //Check array for pairs of roots from the middle outwards
    while (left >= 0 || right < numFactors.length) {
      const leftPass = NumberNamer.findRoot(numFactors[left]);
      const rightPass = NumberNamer.findRoot(numFactors[right]);

      if (leftPass && rightPass) {
        return [numFactors[left], numFactors[right]];
      }
      if (!partialMatch && (leftPass || rightPass)) {
        partialMatch = [numFactors[right], numFactors[left]];
      }

      left--;
      right++;
    }
    //If there's no roots in the factors it's prime or it's 1
    return partialMatch || (numFactors[1] === 1 ? 1 : ["(", numFactors[numFactors.length - 1] - 1, ")"]);
  }

  rootFactors(num = this.numberToName) {
    //Recursively factor all arrays outputed by factoring
    const factorResult = this.factorFinder(num);
    
    if (Array.isArray(factorResult)) {
      return factorResult.flatMap(this.rootFactors);
    } else {
      return [factorResult];
    }
  }

  nameNum() {
    
    let factorArray = this.rootFactors(this.numberToName);
    
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
