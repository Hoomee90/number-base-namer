// Business Logic (BS)

function rootFinder(num) {
  const rootValues = {
    2 : "binary",
    3 : "trinary",
    4 : "quaternary",
    5 : "quinary",
    6 : "sextimal",
    7 : "septimal",
    8 : "octal",
    9 : "nonary",
    10 : "decimal",
    11 : "elevenary",
    12 : "dozenal",
    13 : "baker's dozenal",
    16 : "hex",
    17 : "suboptimal",
    20 : "icosi",
    40 : "niftimal",
    100 : "centesimal",
  }
  if (rootValues[num]) {
    return rootValues[num];
  }
  return null
}