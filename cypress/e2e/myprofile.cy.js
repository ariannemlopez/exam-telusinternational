import {login} from "./login.cy"

describe('My Profile page', () => {
  beforeEach(() => {
    cy.visit('https://www.telusinternational.ai/cmp')
  })
  
  it('should add and remove other languages', () => {
    const language = 'Filipino (Philippines)'
    const proficiency = 'Native or bilingual proficiency'
    login(Cypress.env('username'), Cypress.env('password'), Cypress.env('uniqueIdentifier'))
  
    clickUserAvatar()
    clickMyProfileFromUserAvatar()
    isSpecificPageVisible('Contact Info')

    clickSpecificMyProfilePage('Languages')

    clickButton('Add')
    addLanguage(language, proficiency)
    clickButton('Save')
    verifyAddedOtherLanguage(language, proficiency)

    clickTrashButton()
    if (isYesButtonDisplayed) {
      clickButton('Yes')
    }
    verifyRemovedOtherLanguage(language, proficiency)

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

export function clickButton(text) {
  cy.get('button').contains(text).parent()
    .click()
}

export function addLanguage(language, proficiency) {
  cy.get('input[aria-label="Start typing language and select from the menu"]').should('be.visible').click()
  cy.get('div').contains(language).click()
  cy.get('div').contains(language).should('be.visible')
  
  cy.get('input[aria-label="Select proficiency level*"]').should('be.enabled').click()
  cy.get('input[name="proficiency.id"]').siblings('div').contains(proficiency).click()
}

export function verifyAddedOtherLanguage(language, proficiency) {
  cy.get('form').contains(language).should('be.visible')
  cy.get('form').contains(proficiency).should('be.visible')
}

export function clickTrashButton() {
  cy.get('svg[data-icon="trash-alt"]').should('be.visible').click()
}

export function verifyRemovedOtherLanguage() {
  cy.get('form').should('not.exist')
}

function isYesButtonDisplayed() {
  return cy.get('button').contains('Yes').should('be.visible')
}