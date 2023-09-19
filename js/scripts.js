// Utility Logic
function flagHandler(...arrays) {
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

// Business Logic (BS)

function rootFinder(num, isPrefix = true, hasPrefix = true) {
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

function factorFinder(numOrString) {
  //Root ints are the only input that's return isn't an array
  if (rootFinder(numOrString)) {
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
  //If there's no roots in the factors it's prime or it's 1
  return partialMatch || (numFactors[1] === 1 ? 1 : ["(", numFactors[numFactors.length - 1] - 1, ")"]);
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
  
  let factorArray = rootFactors(num);
  
  //If the input is prime and not the prefix, use a single Un rather than Hen and Sna (kind of hacky)
  if (factorArray.includes("/")) {
    let numerator = factorArray.splice(0, factorArray.indexOf("/"));
    let denominator = factorArray.splice(factorArray.indexOf("/") + 1);
    factorArray = flagHandler(numerator, denominator);
  } else {
    factorArray = flagHandler(factorArray);
  }
  
  //turn integer array into single string with word roots
  let baseName = factorArray.reduce((accumulator, element, index) => accumulator + rootFinder(element, factorArray.length - 1 !== index, index > 0), "");
  
  //fix vowels for ease of pronunciation
  const vowelsAO = new RegExp(/[ao]([aeiou])/, "g");
  const vowelsI = new RegExp(/[i][iu]/, "g");
  return baseName.replace(vowelsI, "i").replace(vowelsAO, "$1");
}

// User Logic (UI)

function inputHandler(e) {
  const output = document.querySelector("#numberResult");
  const input = e.target.value
  const validInput = new RegExp(/^-?([1-9]\d*|0)(\/-?([1-9]\d*|0))?$/);
  if (validInput.test(input)) {
    //checks to keep input within computational ability
    if (input.length >=  9 && !input.includes("/")) {
      output.innerHTML = "Too large! (Do you 𝘸𝘢𝘯𝘵 the page to crash?)"
    }
    else if ((input.slice(0, input.indexOf("/")).length > 7) || (input.slice(input.indexOf("/")).length > 8)) {
      output.innerHTML = "Too large! (Do you 𝘸𝘢𝘯𝘵 the page to crash?)"
    } else {
      output.innerHTML = numberNamer(input);
    }
  }
  else {
      output.innerHTML = input === "" ? "None" : "Invalid Input!";
  }
}

window.addEventListener("load", function() {
  const input = document.querySelector("#numberInput");
  input.addEventListener("input", inputHandler);
});