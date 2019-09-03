/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'user',
      username: 'username',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('/')
  })
  it('Visits the Blog app', function() {
    cy.contains('Blog')
  })

  it('signup form can be opened', function() {
    cy.contains('Login')
      .click()
    cy.contains('Sign Up')
      .click()
    cy.get('#name')
      .type('user')
    cy.get('#username')
      .type('username')
    cy.get('#password')
      .type('password')
    cy.contains('Sign Up')
      .click()
  })
  it('login form can be opened', function() {
    cy.contains('Login')
      .click()
    cy.get('input:first')
      .type('username')
    cy.get('input:last')
      .type('password')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login')
        .click()
      cy.get('input:first')
        .type('username')
      cy.get('input:last')
        .type('password')
      cy.get('button').eq(2)
        .click()
    })
    it('Name of the user is shown', function() {
      cy.contains('username')
    })
    it('a new blog post can be created', function() {
      cy.contains('create new')
        .click()
      cy.get('#title')
        .type('a new post created by Cypress')
      cy.get('#author')
        .type('Cypress')
      cy.get('#url')
        .type('https://docs.cypress.io/')
      cy.get('#create')
        .click()
    })
  })
})
