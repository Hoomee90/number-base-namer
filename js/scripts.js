// Business Logic (BS)

function rootFinder(num, isPrefix) {
  const rootValues = {
    //TODO find a different value than '1'. breaks factor finder
    0 : isPrefix ? "hen" : "un",
    1 : isPrefix ? "sna" : "unfinal",
    2 : isPrefix ? "bi":"binary",
    3 : isPrefix ? "tri":"trinary",
    4 : isPrefix ? "tetra":"quaternary",
    5 : isPrefix ? "penta":"quinary",
    6 : isPrefix ? "hexa":"sextimal",
    7 : isPrefix ? "hepta":"septimal",
    8 : isPrefix ? "octo":"octal",
    9 : isPrefix ? "enna":"nonary",
    10 : isPrefix ? "deca":"decimal",
    11 : isPrefix ? "leva":"elevenary",
    12 : isPrefix ? "doza":"dozenal",
    13 : isPrefix ? "baker":"baker's dozenal",
    16 : isPrefix ? "tesser":"hex",
    17 : isPrefix ? "mal":"suboptimal",
    20 : isPrefix ? "icosi":"icosi",
    40 : isPrefix ? "feta":"niftimal",
    100 : isPrefix ? "hecto":"centesimal"
  }
  if (rootValues[num]) {
    return rootValues[num];
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
      partialMatch = [numFactors[left], numFactors[right]];
    }

    left--;
    right++;
  }
  return partialMatch || [1, numFactors[numFactors.length] - 1, 0];
}

function allFactors(num) {
  const factorResult = factorFinder(num);
  
  if (Array.isArray(factorResult)) {
    return factorResult.flatMap(allFactors);
  } else {
    return [factorResult];
  }
}