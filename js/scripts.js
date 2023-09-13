// Business Logic (BS)

function rootFinder(num, isPrefix = true, hasPrefix = true) {
  const rootValues = {
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
  const numString = (typeof num === "string" ? num : num.toString());
  if (rootValues[numString]) {
    return rootValues[numString];
  }
  return null
}

function factorFinder(num) {
  if (rootFinder(num)) {
    return num;
  }

  let numArray = [...Array(num + 1).keys()];
  let numFactors = numArray.filter(element => num % element === 0);
  let midIndex = Math.floor((numFactors.length - 1) / 2);
  
  if (numFactors.length % 2 !== 0) {
    numFactors.splice(midIndex, 0, numFactors[midIndex]);
  }
  let left = midIndex;
  let right = midIndex + 1;
  let partialMatch = null;

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
  return partialMatch || ["(", numFactors[numFactors.length - 1] - 1, ")"];
}

function rootFactors(num) {
  const factorResult = factorFinder(num);
  
  if (Array.isArray(factorResult)) {
    return factorResult.flatMap(rootFactors);
  } else {
    return [factorResult];
  }
}

function numberNamer(num) {
  let factorArray = rootFactors(num);
  if (factorArray[factorArray.length - 1] === ")") {
    factorArray.pop();
    factorArray[0] = "[";
  }
  const baseName = factorArray.reduce((accumulator, element, index) => accumulator + rootFinder(element, factorArray.length - 1 !== index, index > 0), "");
  return baseName;
}