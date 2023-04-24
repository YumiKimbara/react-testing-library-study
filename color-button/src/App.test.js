import { render, screen } from "@testing-library/react";
import App from "./App";

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

test("renders learn react link", () => {
  // render creates a virtual dom
  render(<App />);
  // can access to the virtual dom by using screen dom
  // /learn react/ is regular expression and i means case insensitive
  // but you can also put string in this argument
  // const linkElement = screen.getByText(/learn react/i);

  // can access by each role (button, link, alert and so on)
  const linkElement = screen.getByRole("link", { name: /learn react/i });

  expect(linkElement).toBeInTheDocument();
});
