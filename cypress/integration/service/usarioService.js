const baseUrl = Cypress.env('API_BASE');
import { acess } from "../../support/commands"; 
// let token;

// before(() => {
//     cy.login().should((response) => {
//         expect(response.status).to.eq(201);
//         token = response.body;
//     });
// })
// Cypress.Commands.add("login", () => {
//     return cy.request({
//         method: 'POST',
//         url:`${baseUrl}/auth/fazer-login`,
//         failOnStatusCode: false,
//         body: {
//             "email": "julio.gabriel@dbccompany.com",
//             "senha": "123"
//         },
//     }).as('response').get('@response')
// })

export default class UsuarioService{
    GETusuarioLogadoRequest(token){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/usuario/logado`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            }
        }).as('response').get('@response')
    }

    GETusuarioRequest(token){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/usuario`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            }
        }).as('response').get('@response')
    }

    GETusuarioIdRequest(id, token){
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

    GETusuarioEmailRequest(email, token){
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

    GETusuarioNomeRequest(name, token){
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

    GETusuarioRecuperarImagemRequest(email, token){
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

    POSTusuarioRequest(payload, genero, token){
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

    PUTusuarioRequest(payload,idUsuario, genero, token){
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

    PUTusuarioFotoRequest(email, foto, token){
        return cy.request({
            method: 'PUT',
            url:`${baseUrl}/usuario/upload-foto`,
            headers:{
                authorization: token,
                'content-type': 'multipart/form-data'
            },
            qs: {
                "email":`${email}`
            },
            multipart: {
                'Content-Disposition': 'form-data',  
                'filename': foto,
                'Content-Type': 'application/octet-stream'
            }, 
            body:foto,
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    DELETElogicoUsuarioRequest(idUsuario, token){
        return cy.request({
            method: 'DELETE',
            url:`${baseUrl}/usuario/${idUsuario}`,
            headers:{
                authorization: token
            },
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    DELETEfisicoUsuarioRequest(idUsuario, token){
        return cy.request({
            method: 'DELETE',
            url:`${baseUrl}/usuario/delete-fisico/${idUsuario}`,
            headers:{
                authorization: token
            },
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    contratoGetUsuario(contrato, acess){
        this.GETusuarioRequest(acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }

    contratoGetUsuarioLogado(contrato, acess){
        this.GETusuarioLogadoRequest(acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }

    contratoGetUsuarioId(contrato, acess, idUsuario){
        this.GETusuarioIdRequest(idUsuario, acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }

    contratoGetUsuarioEmail(contrato, acess, email){
        this.GETusuarioEmailRequest(email, acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }

    contratoGetUsuarioNome(contrato, acess, nome){
        this.GETusuarioNomeRequest(nome, acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }

    contratoGetUsuarioImagem(contrato, acess, email){
        this.GETusuarioRecuperarImagemRequest(email, acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }
    
}