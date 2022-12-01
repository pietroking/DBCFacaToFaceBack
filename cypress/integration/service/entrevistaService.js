const baseUrl = Cypress.env('API_BASE');
let token;

before(() => {
    cy.login().should((response) => {
        expect(response.status).to.eq(201);
        token = response.body;
    });
})
Cypress.Commands.add("login", () => {
    return cy.request({
        method: 'POST',
        url:`${baseUrl}/auth/fazer-login`,
        failOnStatusCode: false,
        body: {
            "email": "julio.gabriel@dbccompany.com",
            "senha": "123"
        },
    }).as('response').get('@response')
})

export default class EntrevistaService{
    GETentrevistaRequest(){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/entrevista`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            }
        }).as('response').get('@response')
    }

    GETentrevistaMesRequest(mes, ano){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/entrevista/listar-por-mes`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            },
            qs: {
                "mes":`${mes}`,
                "ano":`${ano}`
            }
        }).as('response').get('@response')
    }

    POSTentrevistaRequest(payload){
        return cy.request({
            method: 'POST',
            url:`${baseUrl}/entrevista/marcar-entrevista`,
            headers:{
                authorization: token
            },
            body: payload,
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    PUTentrevistaRequest(payload,idEntrevista, legenda){
        return cy.request({
            method: 'PUT',
            url:`${baseUrl}/entrevista/atualizar-entrevista/${idEntrevista}`,
            headers:{
                authorization: token,
            },
            qs: {
                "legenda":`${legenda}`
            },
            body: payload,
            failOnStatusCode: false
        }).as('response').get('@response')
    }
}