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

export default class UsuarioService{
    GETusuarioLogadoRequest(){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/usuario/logado`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            }
        }).as('response').get('@response')
    }

    GETusuarioRequest(){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/usuario`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            }
        }).as('response').get('@response')
    }

    GETusuarioIdRequest(id){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/usuario/id`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            },
            qs: {
                "id":`${id}`
            }
        }).as('response').get('@response')
    }

    GETusuarioEmailRequest(email){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/usuario/email`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            },
            qs: {
                "email":`${email}`
            }
        }).as('response').get('@response')
    }

    GETusuarioNomeRequest(name){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/usuario/findbynomecompleto`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            },
            qs: {
                "nomeCompleto":`${name}`
            }
        }).as('response').get('@response')
    }

    GETusuarioRecuperarImagemRequest(email){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/usuario/recuperar-imagem`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            },
            qs: {
                "email":`${email}`
            }
        }).as('response').get('@response')
    }

    POSTusuarioRequest(payload, genero){
        return cy.request({
            method: 'POST',
            url:`${baseUrl}/usuario`,
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

    PUTusuarioRequest(payload,idUsuario, genero){
        return cy.request({
            method: 'PUT',
            url:`${baseUrl}/usuario/${idUsuario}`,
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

    DELETElogicoUsuarioRequest(idUsuario){
        return cy.request({
            method: 'DELETE',
            url:`${baseUrl}/usuario/${idUsuario}`,
            headers:{
                authorization: token
            },
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    DELETEfisicoUsuarioRequest(idUsuario){
        return cy.request({
            method: 'DELETE',
            url:`${baseUrl}/usuario/delete-fisico/${idUsuario}`,
            headers:{
                authorization: token
            },
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    PUTusuarioFotoRequest(email, foto){
        return cy.request({
            method: 'PUT',
            url:`${baseUrl}/usuario/upload-foto`,
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
}