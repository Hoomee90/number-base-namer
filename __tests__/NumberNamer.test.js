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