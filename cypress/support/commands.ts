// Here are all the commands we can use in our tests!

import { EmailGenerator } from '../support/index';
import { Selectors as SignUpSelectors } from '../e2e/StackToDo_e2e/Sign Up/common' 


// An email generator. In an ideal scenario, we should be able to clear the test/develop database to not saturate the db with new users

Cypress.Commands.add('generateEmail', (baseEmail) => { //Typescript error, non breaking.
    return EmailGenerator.generate(baseEmail)
  });

// This is a quick helper to log in and run any tests that rely on this.

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/signup')
    cy.get(SignUpSelectors.nameInput).type(username);
    cy.fixture('users/user_1').then(function(data){
        this.data= data
        cy.generateEmail(this.data.baseEmail).then((result)=>{
            cy.get(SignUpSelectors.emailInput).type(result);
          })
      })
    cy.get(SignUpSelectors.passwordInput).type(password);
    cy.get(SignUpSelectors.checkboxInput).check();
    cy.get(SignUpSelectors.submitForm).click();

  })

  // My attempt at logging in via API. I was very close! I am sure I almost had it :D. We can alternatively also use cypress session to 
  // not have to log in every time. I can easily set that up too :) 

  Cypress.Commands.add('loginByCSRF', (csrfToken, name, email, password) => {
    cy.request({
      method: 'POST',
      url: '/signup',
      failOnStatusCode: false, 
      form: true, 
      body: {
       next: '', 
       csrf_token: csrfToken,
       name: name,
       email: email,
       password: password,
       agree: 'y',
       submit: 'Sign up',
      },
    })
  })