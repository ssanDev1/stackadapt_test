import { Selectors } from './common'

// This test check that all the links in the homepage are working as expected.

describe('Validate page access and names', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('Menu navigation names are present and accessible',  () => {
    cy.get(Selectors.pageNavigationName).should('have.length', 5).each((element) => {
      expect(element.text()).to.match(/^(Sign Up|Login|Calendar|Integration|FAQ)/)
      cy.visit(`/${element.text().replace(' ', '').toLowerCase()}`)
      cy.url().then(url => {
        expect(url).to.include(`http://stackadapt-interview.us-east-1.elasticbeanstalk.com/${element.text().replace(' ', '').toLowerCase()}`)
      });
    })
  })

})
