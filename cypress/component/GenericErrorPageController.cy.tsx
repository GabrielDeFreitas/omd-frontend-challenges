import { mount } from '@cypress/react18'
import { GenericErrorPageController } from '../../src/pages/generic-error-page/index.page'

describe('GenericErrorPageController - error area', () => {
  it('should display the correct title', () => {
    mount(<GenericErrorPageController />)
    cy.contains('generic-error-page').should('exist')
  })
})
