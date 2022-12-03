// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';
import Ajv from "ajv";
import "cypress-localstorage-commands";
const baseUrl = Cypress.env('API_BASE');

const ajv = new Ajv({ allErrors: true, verbose: true });

export let acess;

Cypress.Commands.add("login", () => {
  return cy.request({
      method: 'POST',
      url:`${baseUrl}/auth/fazer-login`,
      failOnStatusCode: false,
      body: {
          "email": "julio.gabriel@dbccompany.com.br",
          "senha": "123"
      },
  }).as('response').get('@response');
})

Cypress.Commands.add("validaContrato", (contrato, response) => {
    //pegar o arquivo (Schema) pasta fixtures e passar com parameto
    cy.fixture(contrato).then((contrato) => {
      // compilar esse arquivo, (jsonSchema)
      const validate = ajv.compile(contrato);
      // response  da api (validações)
      const responseApi = validate(response.body);
  
      // Validação (Error)
      if (!responseApi)
        cy.log(validate.errors).then(() => {
          throw new Error("Falha do contrato");
        });
    });
  });

  