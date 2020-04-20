import { URLS } from '../../src/api';

const testUsers = [
  { id: 1, first_name: 'Alex', last_name: 'Parra' },
  { id: 2, first_name: 'John', last_name: 'Doe' },
  { id: 3, first_name: 'Mary', last_name: 'Smith' },
];

// Stub fetch as a quick way to mock employees
Cypress.on('window:before:load', (win) => {
  win.fetch = async (url) => {
    if (url === URLS.getEmployees) {
      return { ok: true, json: async () => testUsers };
    }
    return { ok: false };
  };
});

describe('React Autocomplete', () => {
  it('Works as expected', () => {
    cy.visit('http://localhost:3000');
    cy.get('#findEmployee').should('exist');
    cy.get('#findEmployee input').type('Alex');

    cy.get('[data-cy="autoCompleteWrap"] ol li').should('have.length', 1);

    cy.get('[data-cy="autoCompleteWrap"] ol li').first().click();

    const [testUser] = testUsers;
    cy.get('#findEmployee input').should('have.value', `${testUser.first_name} ${testUser.last_name}`);
  });
});
