import { mount } from '@cypress/react18'
import { GenericPageController } from '../../src/pages/generic-page/index.page'

describe('GenericPageController - base url', () => {
  it('should display the correct title', () => {
    mount(<GenericPageController />)
    cy.contains('generic-page').should('exist')
  })
})
