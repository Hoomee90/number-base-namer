// Business Logic (BS)

function rootFinder(num, isPrefix) {
  const rootValues = {
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
  let numArray = [...Array(num + 1).keys()];
  return numArray.filter(element => num % element === 0);
}