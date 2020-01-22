# Equal Experts Calculator Assignment 
Developed against instruction version `e5ce2b40e077ee165c0a6b7598317089354c8922`.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements
- Node (v12+) - https://nodejs.org

## Installation
Run `npm i` in the project root to install dependencies.

## Running the app

In the project root, run `npm start`. This starts the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Running tests
In the project root, run `npm test`. This will launch the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

**To see coverage**, run `npm test -- --coverage --watchAll=false`

### Following the trail
I habitually commit as I develop each feature, and follow red-green-refactor. You can see the test suite building up and the code being refactored over the commit trail.

### After the time's up
Given more time, these are some of the improvements/missing features I'd like to add:
 
- Keyboard input. I chose to prioritise mouse input because it's a more common feature in web apps and keyboard input would have made for fairly verbose code for the purposes of a review
- Extract the calculation logic out, probably into a `useReducer` hook
- Additional calculator functions, e.g. sqrt, trig, factorial, log and other "scientific" features
- Generate fuzz input data to get more confidence in the calculator
- Consider the testing strategy and whether there is a need for more edge-case tests (almost certainly)
- Add autoprefixer config to make CSS grid layout IE compatible
