# Jupiter Toys Tests with Playwright

## Prerequisites
Before running the tests, ensure you have the following installed:
1. Node.js
2. npm (Node Package Manager) or Yarn
3. Playwright
4. Winston This project uses Winston for logging.

## Getting Started
1.  Clone the repository
2.  Install Playwright dependencies

## Running the Tests
The tests are specifically created to run on desktop browser.
npx playwright test

## Project Structure
`src/tests`
test.spec.ts - This file contains all tests.

`src/pages` (POM model):
menu.ts – Page model for the main menu navigation
contact.ts – Page model for Contact form interactions
cart.ts – Page model for the shopping cart
shop.ts – Page model for the product shop page

`src/utils` 
logger.ts – Configures the winston logger for step-by-step logging

## Reporting & Logs
Playwright’s HTML reporter shows detailed test steps and results.
Logs are generated via Winston to assist in debugging test failures or behavior.
