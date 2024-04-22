import { signOut, clickUserAvatar } from "./myprofile.cy";

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('https://www.telusinternational.ai/cmp')
  })

  it('should login successfully', () => {
    login(Cypress.env('username'), Cypress.env('password'), Cypress.env('uniqueIdentifier'))
  });

  it('should logout successfully', () => {
    login(Cypress.env('username'), Cypress.env('password'), Cypress.env('uniqueIdentifier'))
    clickUserAvatar()
    signOut()
    isEmailFieldVisible()
  })
});

export function isUniqueIdentifierVisible(uniqueIdentifier) {
  cy.get('p').contains('Unique Identifier:')
    .siblings().contains(uniqueIdentifier)
    .should('be.visible')
}

export function clickSignInButton() {
  cy.get('button[aria-label="signInButtonPassword"]')
    .click()
}

export function enterPassword(password) {
  cy.get('input[type="password"]')
    .should('be.visible')
    .type(password)
}

export function clickContinueButton() {
  cy.get('button')
    .contains('Continue')
    .parent()
    .click()
}

export function enterEmail(username) {
  cy.get('input[type="email"]')
    .should('be.visible')
    .type(username)
}

export function isEmailFieldVisible() {
  cy.get('input[type="email"]')
    .should('be.visible')
}

export function login(username, password, uniqueIdentifier) {
  enterEmail(username)
  clickContinueButton()
  enterPassword(password)
  clickSignInButton()
  isUniqueIdentifierVisible(uniqueIdentifier)
}