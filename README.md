# Text Analyzer

#### By **Samantha Callie**, inspired by [jan Misali](https://www.seximal.net/names-of-other-bases)

#### 

## Technologies Used

* HTML
* CSS
* BootStrap
* JS

## Description

.

## Setup/Installation Requirements

* Clone repository
* Navigate to the top level of the directory
* Open index.html in your browser

## Known Bugs

* There are no known bugs on the site

## License

[GNU GPLv3](https://choosealicense.com/licenses/agpl-3.0/)

Copyright (c) 2023 Samantha Callie

## Test Used During Development

#### Pseudocode tests for review  

Describe: rootFinder()

Test: "It should return null if given a number outside the roots"
Code:
const num = 18;
rootFinder(num);
Expected Output: null

Test: "It should return the appropriate root final for any given root number"
Code:
const num = 2;
rootFinder(num);
Expected Output: "binary"

Test: "It should return the appropriate root prefix for any given root prefix"
Code:
const num = 3;
const isPrefix = true
rootFinder(num);
Expected Output: "tri"

Test: "It should treat string and integer keys the same, and add '(' ')' into dictionary as markers"
Code:
const num = '(';
const isPrefix = false
rootFinder(num);
Expected Output: "un"

Test: "handle lone 10 and 13 inputs correctly"
Code:
const num = 200;
rootFinder(num);
Expected Output: "decavigesimal"

Test: "handle non-lone zeros for fractions"
Code:
const num = 0;
const isPrefix = false
rootFinder(num, isPrefix);
Expected Output: "infinial"

Describe: factorFinder()

Test: "It should create an array of ascending numbers as long as the input"
Code:
const num = 2;
factorFinder(num);
Expected Output: [0, 1, 2]

Test: "It should filter the array into only the factors of the input"
Code:
const num = 6;
factorFinder(num);
Expected Output: [1, 2, 3, 6]

Test: "It should return only the two closest together factors"
Code:
const num = 6;
factorFinder(num);
Expected Output: [2, 3]

Test: "It should return the two closest together factors in which at least one has a root value"
Code: 
const num = 196;
factorFinder(num);
Expected Output: [7, 28]

Test: "It should prioritize returning a pair that both pass regardless of distance"
Code: 
const num = 600;
factorFinder(num);
Expected Output: [6, 100]

Test: "It should return prime non-roots as one less than the input, with markers at the beginning and end"
Code: 
const num = 19;
factorFinder(num);
Expected Output: [0, 18, 999]

Test: "It should return numbers smallest to largest"
Code: 
const num = 324;
factorFinder(num);
Expected Output: [9, 36]

Test: "It should handle negative input"
Code: 
const num = -10;
factorFinder(num);
Expected Output: [-1, 10]

Test: "It should handle fraction input"
Code: 
const num = "3/2";
factorFinder(num);
Expected Output: [3, "/", 2]

Describe: rootFactors(num)

Test: "It should create an array of factors and factors of factors that have root values"
Code:
const num = 98;
rootFactors(num);
Expected Output: [7, [2, 7]]

Test: "It should create an array of factors and factors of factors recursively that have root values"
Code:
const num = 2401;
rootFactors(num);
Expected Output: [7, 7, 7, 7]

Describe numberNamer()

Test: "It should return a string made of the root factor names of integer input"
Code:
const num = 24;
numberNamer(num);
Expected Output: "tetrahexa"

Test: "The final factor should not be a prefix"
Code:
const num = 646;
numberNamer(num);
Expected Output: "hentrihexasnabisuboptimal"

Test: "handle none-lone 10 and 13 inputs correctly"
Code:
const num = 200;
numberNamer(num);
Expected Output: "decavigesimal"

Test: "handle 1 and -1 inputs correctly"
Code:
const num = 1;
numberNamer(num);
Expected Output: "unary"