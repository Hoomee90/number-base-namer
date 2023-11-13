import NumberNamer from "../src/NumberNamer";

describe(`NumberNamer`, () => {
  test(`should correctly create a NumberNamer Object with a value to calculate`, () => {
    const nameNumObject = new NumberNamer(5);
    expect(nameNumObject.numberToName).toEqual(5);
  });
});

describe(`handleFlags`, () => {
  test(`should return inputted arrays concatenated together with slashes`, () => {
    expect(NumberNamer.handleFlags([`foo`], [`bar`])).toEqual([`foo`, `/`, `bar`]);
  });

  test(`should turn starting and ending parens in arrays into a single starting bracket`, () => {
    expect(NumberNamer.handleFlags([`(`, `foo`, `)`])).toEqual([`[`, `foo`]);
  })

  test(`should turn arrays of only the int 1 into the string ONE`, () => {
    expect(NumberNamer.handleFlags([1])).toEqual([`ONE`])
  });
});

describe(`isPrime`, () => {
  test(`should correctly determine one, even, and multiples of three to be not prime`, () => {
    expect(NumberNamer.isPrime(1)).toEqual(false);
    expect(NumberNamer.isPrime(4)).toEqual(false);
    expect(NumberNamer.isPrime(6)).toEqual(false);
  });

  test(`should correctly determine two and three to be prime`, () => {
    expect(NumberNamer.isPrime(2)).toEqual(true);
    expect(NumberNamer.isPrime(3)).toEqual(true);
  });

  test(`should correctly determine larger primes`, () => {
    expect(NumberNamer.isPrime(5)).toEqual(true);
    expect(NumberNamer.isPrime(257)).toEqual(true);
  });

  test(`should correctly determine larger non-primes`, () => {
    expect(NumberNamer.isPrime(259)).toEqual(false);
  });
});

describe(`findRoot`, () => {
  
  const testData = {
    "ONE" : "uni",
    "0" : "null",
    "-1": "nega",
    "/" : "vöt",
    "[" : "un",
    "(" : "hen",
    ")" : "sna",
    "2" : "bi",
    "3" : "tri",
    "4" : "tetra",
    "5" : "penta",
    "6" : "hexa",
    "7" : "hepta",
    "8" : "octo",
    "9" : "enna",
    "10" : "deca",
    "11" : "leva",
    "12" : "doza",
    "13" : "baker",
    "16" : "tesser",
    "17" : "mal",
    "20" : "icosi",
    "36" : "feta",
    "100" : "hecto"
  }

  test(`should return null on invalid input`, () => {
    expect(NumberNamer.findRoot("incorrect")).toBeNull;
  });

  Object.entries(testData).forEach(([key, expectedValue]) => {
    
    test(`should return the correct value for ${key}`, () => {
    expect(NumberNamer.findRoot(key)).toEqual(expectedValue);
    });
  });

  test(`should return a string for all valid inputs`, () => {
    Object.keys(testData).forEach(key => {
    expect(typeof NumberNamer.findRoot(key)).toEqual(`string`);
    });
  });
});
