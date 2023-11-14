import NumberNamer from "../src/NumberNamer";

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

describe(`NumberNamer`, () => {
  test(`should correctly create a NumberNamer Object with a value to calculate`, () => {
    const nameNumObject = new NumberNamer();
    expect(typeof nameNumObject.memo).toEqual('object');
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

  test(`should return correctly for int input`, () => {
  expect(NumberNamer.findRoot(7)).toEqual(`hepta`);
  });
});

describe (`getFactorPairs`, () => {

  test(`should factor small nums`, () => {
    expect(NumberNamer.getFactorPairs(10)).toEqual([[2, 5]]);
  });

  test(`should factor larger nums`, () => {
    expect(NumberNamer.getFactorPairs(210)).toEqual([[2, 105], [3, 70], [5, 42], [6, 35], [7, 30], [10, 21], [14, 15]]);
  });
});

describe (`factorShortest`, () => {

  const nameNumObject = new NumberNamer();

  Object.keys(testData).forEach(key => {
    test(`should return all inputs that have a findRoot return value unchanged`, () => {
      expect(nameNumObject.factorShortest(key)).toEqual([key])
    });
  });

  test(`should return 1 as 1`, () => {
    expect(nameNumObject.factorShortest(`1`)).toEqual([1]);
  });

  test(`should return primes as an array of num -1 with flags`, () => {
    expect(nameNumObject.factorShortest(`19`)).toEqual([`(`, 18, `)`]);
    expect(nameNumObject.factorShortest(`1997`)).toEqual([`(`, 1996, `)`]);
  });

  test(`should return strings of fractions as an array of the numerator and denominator with flag`, () => {
    expect(nameNumObject.factorShortest(`1/1`)).toEqual([1, `/`, 1]);
    expect(nameNumObject.factorShortest(`0/413`)).toEqual([0, `/`, 413]);
  });

  test(`should return negatives as the abs of input with flag`, () => {
    expect(nameNumObject.factorShortest(`-2`)).toEqual([`-1`, 2]);
    expect(nameNumObject.factorShortest(`-612`)).toEqual([`-1`, 612]);
  });

  test(`should return primes as an array of num -1 with flags`, () => {
    expect(nameNumObject.factorShortest(`19`)).toEqual([`(`, 18, `)`]);
    expect(nameNumObject.factorShortest(`1997`)).toEqual([`(`, 1996, `)`]);
  });

  test(`should return the two matching factors that have a nameNumObject.findRoot value`, () => {
    expect(nameNumObject.factorShortest(`32`)).toEqual([2, 16]);
    expect(nameNumObject.factorShortest(`66`)).toEqual([6, 11]);
  });

  test(`should return the two closest matching factors if all pairs only have one that passes NumberNamer.findRoot value`, () => {
    expect(nameNumObject.factorShortest(`666`)).toEqual([9, 74]);
    expect(nameNumObject.factorShortest(`111111`)).toEqual([13, 8547]);
  });

});

// describe (`rootFactors`, () => { 
//   test(`should return the input in an array if it passes through NumberNamer.factorFinder unchanged`, () => {
//     expect(NumberNamer.rootFactors(1)).toEqual([1]);
//     expect(NumberNamer.rootFactors(`36`)).toEqual([`36`]);
//   });

//   test(`should return all the input completely factorized by NumberNamer.factorFinder`, () => {
//     expect(NumberNamer.rootFactors(1025)).toEqual([`(`, 8, 8, 16, `)`]);
//     expect(NumberNamer.rootFactors(413)).toEqual([`(`, `(`, 4, 7, `)`, 2, `)`, 7]);
//   });
// });