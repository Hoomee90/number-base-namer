// Business Logic (BS)

function rootFinder(num, isPrefix = true, hasPrefix = true) {
  const rootValues = {
    "0" : "nullary",
    "-1": isPrefix ? "nega" : (hasPrefix ? "negunary" : "unary"),
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
  }
  //Look up both strings or integers
  const numString = (typeof num === "string" ? num : num.toString());
  if (rootValues[numString]) {
    return rootValues[numString];
  }
  return null
}

function factorFinder(num) {
  //Root ints are the only input that's return isn't an array
  if (rootFinder(num)) {
    return num;
  }
  if (num < 0) {
    return ["-1", Math.abs(num)];
  } 
  //Create an array of all the input's factors
  let numArray = [...Array(num + 1).keys()];
  let numFactors = numArray.filter(element => num % element === 0);
  let midIndex = Math.floor((numFactors.length - 1) / 2);
  
  if (numFactors.length % 2 !== 0) {
    numFactors.splice(midIndex, 0, numFactors[midIndex]);
  }
  let left = midIndex;
  let right = midIndex + 1;
  let partialMatch = null;

  //Check array for pairs of roots from the middle outwards
  while (left >= 0 || right < numFactors.length) {
    const leftPass = rootFinder(numFactors[left]);
    const rightPass = rootFinder(numFactors[right]);

    if (leftPass && rightPass) {
      return [numFactors[left], numFactors[right]];
    }
    if (!partialMatch && (leftPass || rightPass)) {
      partialMatch = [numFactors[right], numFactors[left]];
    }

    left--;
    right++;
  }
  //If there's no roots in the factors it's prime
  return partialMatch || ["(", numFactors[numFactors.length - 1] - 1, ")"];
}

function rootFactors(num) {
  //Recursively factor all arrays outputed by factoring
  const factorResult = factorFinder(num);
  
  if (Array.isArray(factorResult)) {
    return factorResult.flatMap(rootFactors);
  } else {
    return [factorResult];
  }
}

function numberNamer(num) {
  //Awful patch for exceptions
  if (num === 0 || num === -1 || num === 1) {
    return rootFinder(-1 * Math.abs(num), false, num - 1);
  }
  let factorArray = rootFactors(num);A
  //If the input is prime and not the prefix, use a single Un rather than Hen and Sna (kind of hacky)
  if (factorArray[factorArray.length - 1] === ")") {
    factorArray.pop();
    factorArray[0] = "[";
  }
  //turn integer array into single string with word roots
  let baseName = factorArray.reduce((accumulator, element, index) => accumulator + rootFinder(element, factorArray.length - 1 !== index, index > 0), "");
  
  //fix vowels for ease of pronunciation
  const vowelsAO = new RegExp(/[ao]([aeiou])/, "g");
  const vowelsI = new RegExp(/[i][iu]/, "g");
  return baseName.replace(vowelsI, "i").replace(vowelsAO, "$1");
}