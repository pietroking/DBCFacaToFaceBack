import { acess } from "../../support/commands";

const baseUrl = Cypress.env('API_BASE');
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

export default class CandidatoService{
    GETcandidatoRequest(token){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/candidato`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            }
        }).as('response').get('@response')
    }

    GETcandidatoEmailRequest(email, token){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/candidato/findbyemails/${email}`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            }
        }).as('response').get('@response')
    }

    GETcandidatoRecuperarImagemRequest(email, token){
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

    GETcandidatoRecuperarCurriculo(email, token){
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

    GETcandidatoListaPrincipal(nome, trilha, token){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/candidato/listar-candidato-principal-por-nome-ou-por-trilha`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            },
            qs: {
                "nomeCompleto":`${nome}`,
                "nomeTrilha":`${trilha}`
            }
        }).as('response').get('@response')
    }

    GETcandidatoListaCadasto(nome, trilha, token){
        return cy.request({
            method: 'GET',
            url:`${baseUrl}/candidato/listar-candidato-cadastro-por-nome-ou-por-trilha`,
            failOnStatusCode: false,
            headers:{
                authorization: token
            },
            qs: {
                "nomeCompleto":`${nome}`,
                "nomeTrilha":`${trilha}`
            }
        }).as('response').get('@response')
    }

    POSTcandidatoRequest(payload, genero, token){
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

    PUTcandidatoRequest(payload,idCandidato, genero, token){
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

    PUTcandidatoFotoRequest(email, foto, token){
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

    PUTcandidatoCurriculoRequest(email, curriculo, token){
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

    DELETElogicoCandidatoRequest(idCandidato, token){
        return cy.request({
            method: 'DELETE',
            url:`${baseUrl}/candidato/${idCandidato}`,
            headers:{
                authorization: token
            },
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    DELETEfisicoCandidatoRequest(idCandidato, token){
        return cy.request({
            method: 'DELETE',
            url:`${baseUrl}/candidato/delete-fisico/${idCandidato}`,
            headers:{
                authorization: token
            },
            failOnStatusCode: false
        }).as('response').get('@response')
    }

    contratoGetCandidato(contrato, acess){
        this.GETcandidatoRequest(acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }

    contratoGetCandidatoRecuperarImagem(contrato, email, acess){
        this.GETcandidatoRecuperarImagemRequest(email, acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }

    contratoGetCandidatoListaPrincipal(contrato, nome, trilha, acess){
        this.GETcandidatoListaPrincipal(nome, trilha, acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }

    contratoGetCandidatoListaCadastro(contrato, nome, trilha, acess){
        this.GETcandidatoListaCadasto(nome, trilha, acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }

    contratoGetCandidatoEmail(contrato, email, acess){
        this.GETcandidatoEmailRequest(email, acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }

    contratoGetCandidatoCurriculo(contrato, email, acess){
        this.GETcandidatoRecuperarCurriculo(email, acess).then((response) => {
            cy.validaContrato(contrato, response);
        })
    }
}