const baseUrl = Cypress.env('API_BASE');

// Cypress.Commands.add("login", () => {
//     return cy.request({
//         method: 'POST',
//         url:`${baseUrl}/auth/fazer-login`,
//         failOnStatusCode: false,
//         body: {
//             "email": "julio.gabriel@dbccompany.com",
//             "senha": "123"
//         },
//     }).its("body")
//     .then((response) => cy.setLocalStorage("acess", response));
// })

export default class LoginService{
    Login(){
        return cy.request({
            method: 'POST',
            url:`${baseUrl}/auth/fazer-login`,
            failOnStatusCode: false,
            body: {
                "email": Cypress.env('principalUser').email,
                "senha": Cypress.env('principalUser').password
            },
        }).as('response').get('@response')
    }

    LoginADM(){
        return cy.request({
            method: 'POST',
            url:`${baseUrl}/auth/fazer-login`,
            failOnStatusCode: false,
            body: {
                "email": Cypress.env('admUser').email,
                "senha": Cypress.env('admUser').password
            },
        }).as('response').get('@response')
    }

    LoginGESTAO(){
        return cy.request({
            method: 'POST',
            url:`${baseUrl}/auth/fazer-login`,
            failOnStatusCode: false,
            body: {
                "email": Cypress.env('gestaoUser').email,
                "senha": Cypress.env('gestaoUser').password
            },
        }).as('response').get('@response')
    }

    LoginINSTRUTOR(){
        return cy.request({
            method: 'POST',
            url:`${baseUrl}/auth/fazer-login`,
            failOnStatusCode: false,
            body: {
                "email": Cypress.env('instrutorUser').email,
                "senha": Cypress.env('instrutorUser').password
            },
        }).as('response').get('@response')
    }
}