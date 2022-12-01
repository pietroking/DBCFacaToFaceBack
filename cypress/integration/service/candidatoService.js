const baseUrl = Cypress.env('API_BASE');
let token;

before(() => {
    cy.login().should((response) => {
        expect(response.status).to.eq(200);
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

export default class CandidatoService{
    GETcandidatoRequest(){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/candidato`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            }
        }).as('response').get('@response')
    }

    GETcandidatoEmailRequest(email){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/candidato/findbyemails/${email}`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            }
        }).as('response').get('@response')
    }

    GETcandidatoRecuperarImagemRequest(email){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/candidato/recuperar-imagem`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            },
            qs: {
                "email":`${email}`
            }
        }).as('response').get('@response')
    }

    GETcandidatoRecuperarCurriculo(email){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/candidato/recuperar-curriculo`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            },
            qs: {
                "email":`${email}`
            }
        }).as('response').get('@response')
    }

    GETcandidatoListaPrincipal(busca){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/candidato/listar-candidato-principal-por-nome-ou-por-trilha`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            },
            qs: {
                "busca":`${busca}`
            }
        }).as('response').get('@response')
    }

    GETcandidatoListaCadasto(busca){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/candidato/listar-candidato-cadastro-por-nome-ou-por-trilha`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            },
            qs: {
                "busca":`${busca}`
            }
        }).as('response').get('@response')
    }

    POSTcandidatoRequest(payload, genero){
        return cy.request({
            method: 'POST',
            url:`${baseUrl}/candidato`,
            headers:{
                authorization: token
            },
            qs: {
                "genero":`${genero}`
            },
            body: payload,
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    PUTcandidatoRequest(payload,idCandidato, genero){
        return cy.request({
            method: 'PUT',
            url:`${baseUrl}/candidato/${idCandidato}`,
            headers:{
                authorization: token
            },
            qs: {
                "genero":`${genero}`
            },
            body: payload,
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    PUTcandidatoFotoRequest(email, foto){
        return cy.request({
            method: 'PUT',
            url:`${baseUrl}/candidato/upload-foto`,
            headers:{
                authorization: token
            },
            qs: {
                "email":`${email}`
            },
            body: foto,
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    PUTcandidatoCurriculoRequest(email, curriculo){
        return cy.request({
            method: 'PUT',
            url:`${baseUrl}/candidato/upload-foto`,
            headers:{
                authorization: token
            },
            qs: {
                "email":`${email}`
            },
            body: curriculo,
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    DELETElogicoCandidatoRequest(idCandidato){
        return cy.request({
            method: 'DELETE',
            url:`${baseUrl}/candidato/${idCandidato}`,
            headers:{
                authorization: token
            },
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    DELETEfisicoCandidatoRequest(idCandidato){
        return cy.request({
            method: 'DELETE',
            url:`${baseUrl}/candidato/delete-fisico/${idCandidato}`,
            headers:{
                authorization: token
            },
            failOnStatusCode: false
        }).as('response').get('@response')
    }
}