import { Selectors } from './common'
import { Selectors as LoginSelectors } from '../To Do/common'

describe('Sign up page validations', () => {

  beforeEach(() => {
    // We set the URL in beforeEach to run it on each test
    // We pre-load our fixtures using Cypress recommended approach (requires function() instead of arrow).
    cy.fixture('users/user_1').as('data');
    cy.visit('/signup');
  })

  it('Check if input error warnings get triggered',  function () {
    cy.get(Selectors.submitForm).click();
    cy.get(Selectors.inputWarning).should('contain', 'Please Enter a valid').children()
   .should('contain', 'Name').and('contain', 'Email').and('contain', 'Password')
    cy.get(Selectors.inputWarning).should('contain', 'This checkbox is required')
  })

  it('Test form submission with invalid email',  function () {
    cy.get(Selectors.nameInput).type(this.data.validName);
    cy.get(Selectors.emailInput).type(this.data.invalidEmail);
    cy.get(Selectors.passwordInput).type(this.data.validPassword);
    cy.get(Selectors.checkboxInput).check();
    cy.get(Selectors.submitForm).click();
    cy.get(Selectors.inputWarning).should('contain', 'Please Enter a valid').children().should('contain', 'Email')
  })

  it('Test form submission with invalid password',  function () {
    cy.get(Selectors.nameInput).type(this.data.validName);
    cy.generateEmail(this.data.baseEmail).then((result)=>{
      cy.get(Selectors.emailInput).type(result);
    })
    cy.get(Selectors.passwordInput).type(this.data.invalidPassword);
    cy.get(Selectors.checkboxInput).check();
    cy.get(Selectors.submitForm).click();
    cy.get(Selectors.inputWarning).should('contain', 'Please Enter a valid').children().should('contain', 'Password')
  })

  it('User is able to sign up with a valid email and password',  function () {
    cy.get(Selectors.nameInput).type(this.data.validName);
    cy.generateEmail(this.data.baseEmail).then((result)=>{
      cy.get(Selectors.emailInput).type(result);
    })
    cy.get(Selectors.passwordInput).type(this.data.validPassword);
    cy.get(Selectors.checkboxInput).check();
    cy.get(Selectors.submitForm).click();
    cy.get(LoginSelectors.navigationMenuDropdown, { timeout: 5000 }).should('contain' , 'Sergio Tester');
  })
})
