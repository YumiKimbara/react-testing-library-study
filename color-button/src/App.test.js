import { render, screen, logRoles, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";

/*
 * npm test -> starts by running jest in the watch mode.
 * 1. React testing libarary helps with
 *  - rendering components into virtual DOM
 *  - searching virtual DOM
 *  - interactiong with virtual DOM
 * 2. React testing libarary needs a test runner(Jest, Mocha, Jasmine...)
 *  - find tests, run them, make assertions
 * 3. Jest
 *  - is recomended by Testing Library
 *  - comes with create-react-app
 * React testing library uses jest watch
 *  - jest watch watches for changes in files since last commit
 *  - only run tests related to the changed files
 *  - if no changes, then no tests
 */

/*
 * # TDD (Test-Driven Development)
 * 1. Write tests before writing code
 * - then write code according to "spec" set by tests
 * 2. "red-grean" testing
 * - test fails first. and write code to pass the test(from red to green)
 */

/*
 * # What does React Testing Library Do?
 * Creates virtual DOM for testing
 * - and utilities for interacting with DOM
 * Allows testing without a browser
 */

/*
 * # Types of Testing
 * Unit tests
 * - tests one unit of code in isolation
 * Integration tests
 * - how multiple units work together
 * Functional Tests
 * - tests a particular function of software
 * Acceptance / End-to-end(E2E) Tests
 * - use actual browser and server(Cypress, Selenium)
 */

// test("renders learn react link", () => {
//   // render creates a virtual dom
//   render(<App />);
//   // can access to the virtual dom by using screen dom
//   // /learn react/ is regular expression and i means case insensitive
//   // but you can also put string in this argument
//   // const linkElement = screen.getByText(/learn react/i);

//   // can access by each role (button, link, alert and so on)
//   const linkElement = screen.getByRole("link", { name: /learn react/i });

//   expect(linkElement).toBeInTheDocument();
// });

/*
 * install eslint-plugin-testing-library, eslint-plugin-jest-dom
 * delete eslintConfig from the package.json to delete default config
 * create a .eslintrc.json file and write your own config
 */

test("button has correct initial color, and updates when its clicked", () => {
  // destructure container from render
  // This helper function logRoles can be used to print out a list of all the implicit ARIA roles within a tree of DOM nodes
  // const { container } = render(<App />);
  // logRoles(container);

  render(<App />);

  // find an element with a role of button and text of "change to blue"
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ "background-color": "red" });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  // expect the button text to be "Change to red"
  expect(colorButton).toHaveTextContent("Change to red");
});

test("initial conditions", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  expect(checkbox).not.toBeChecked();
});

// describe will group tests
describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letters", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumViletRed")).toBe("Medium Vilet Red");
  });
});
