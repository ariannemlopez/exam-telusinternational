import {login} from "./login.cy"

describe('My Profile page', () => {
  beforeEach(() => {
    cy.visit('https://www.telusinternational.ai/cmp');
  })
  
  it('should add other languages', () => {
    login(Cypress.env('username'), Cypress.env('password'), Cypress.env('uniqueIdentifier'))
  
    clickUserAvatar();
    clickMyProfileFromUserAvatar();
    isSpecificPageVisible('Contact Info');

    clickSpecificMyProfilePage('Languages')

    clickAddButton()

    addLanguage('Filipino (Philippines)', 'Native or bilingual proficiency') //selecting dropdown is still not working

    //click save
    //validate saved other language

  })
})

export function clickUserAvatar() {
  cy.get('header[data-testid="default-navigation"]')
    .children().find('button').first().click()
}

export function clickMyProfileFromUserAvatar() {
  cy.get('a').contains('My Profile').parent()
    .should('be.visible')
    .click()
}

export function signOut() {
  cy.get('a').contains('Sign Out').parent()
    .should('be.visible')
    .click()
}

export function isSpecificPageVisible(page) {
  cy.get('a[aria-current="page"]').contains(page)
    .should('be.visible')
}

export function clickSpecificMyProfilePage(page) {
  cy.get('a').contains(page)
    .click()
}

export function clickAddButton() {
  cy.get('button')
    .contains('Add')
    .parent()
    .click()
}

export function addLanguage(language, proficiency) {
  cy.get('input[aria-label="Start typing language and select from the menu"]').should('be.visible').click()
    .type(language)
    .siblings().click()

  cy.get('input[aria-label="Select proficiency level*"]').should('be.enabled')
    .type(proficiency)
}