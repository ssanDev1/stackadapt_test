import { Selectors } from './common'

describe('To-Do List sanity check', () => {
  
  beforeEach(() => {
    // We set the URL in beforeEach to run it on each test
    // We pre-load our fixtures using Cypress recommended approach (requires function() instead of arrow).
    cy.fixture('users/user_1').as('data').then(function (data){
        this.data = data

    //As an example, I created a login command that helps us login faster for any tasks on the page.    
     cy.login(data.validName, data.validPassword)


    })

  })

  // I reckon that it logs in with every test, however we can avoid this using cy.session, which is easy to configure.
  // I could have configured the API log further but probably with the DB access I could have done this much faster. :P 

  it('Tests that user cannot create an empty task',  function () {
    cy.get(Selectors.taskTable).contains('add a task').click();
    cy.get(Selectors.submitButton).click();
    cy.contains(`Can't leave the text field empty`).should('exist');
  })

  it('Tests that user can create a new task and view it',  function () {
    cy.get(Selectors.taskTable).contains('add a task').click();
    cy.get(Selectors.inputTask).type(this.data.body);
    cy.get(Selectors.submitButton).click();
    cy.get(Selectors.viewButton).click();
    cy.get(Selectors.taskCardText).should('contain', this.data.body);
  })

  it('Tests that user edit and delete a task',  function () {
    cy.get(Selectors.taskTable).contains('add a task').click();
    cy.get(Selectors.inputTask).type(this.data.body);
    cy.get(Selectors.submitButton).click();
    cy.get(Selectors.editButton).click();
    //re-using element
    cy.get(Selectors.inputTask).click().type('Edited');
    cy.get(Selectors.submitButton).click();
    cy.get(Selectors.taskTable).should('contain', 'caseEdited');
    
    //Delete task
    cy.get(Selectors.deleteButton).click();
    cy.contains('caseEdited').should('not.exist');
    cy.get(Selectors.taskTable).should('contain', 'add a task');
  })

  it('Special test - Deleting two or more tasks belonging to an user results in only one task being left displayed on the task table',  function () {
    const extraTasksAdded = 5;
    cy.get(Selectors.taskTable).contains('add a task').click();
    cy.get(Selectors.inputTask).type('Base Task');
    cy.get(Selectors.submitButton).click();

    for (let i = 1; i <= extraTasksAdded; i += 1) { 
    cy.get(Selectors.navigationMenuDropdown).contains('Tasks').click()
    cy.get(Selectors.navigationDropdownItem).contains('Add Task').click()
    cy.get(Selectors.inputTask).type(`New Task ${i}`)
    cy.get(Selectors.submitButton).click();
    }

    for (let i = extraTasksAdded; i >= 1; i -= 1) { 
    cy.get('tbody').children().get(Selectors.deleteButton).eq(i).click()
    }

    cy.get(Selectors.taskTable).should('not.contain', 'New Task')
    cy.get(Selectors.taskTable).should('contain', 'Base Task')
  })
})