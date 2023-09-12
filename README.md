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