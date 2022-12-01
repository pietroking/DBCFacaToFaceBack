import CandidatoService from "../../service/candidatoService";
const candidatoService = new CandidatoService();
const idInexistente = 9999;
const nomeInexistente = 'ahahahahahaha';
const candidatoTest = require('../../../fixtures/candidato.payload.json');
const candidatoNovoTest = require('../../../fixtures/candidatoAtualizado.payload.json');
const candidatoErrorEmailTest = require('../../../fixtures/candidatoErrorEmail.payload.json');
const candidatoErrorTrilhaTest = require('../../../fixtures/candidatoErrorTrilha.payload.json');
const candidatoErrorEmailEmBrancoTest = require('../../../fixtures/candidatoErrorEmailEmBranco.payload.json');

context('Candidato-Controller', () => {
//////////////   GET-POSITIVOS   //////////////
    it('GET - Listar candidatos', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('GET/candidato')
        candidatoService.GETcandidatoRequest()
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.elementos).that.is.not.empty;
        })
    });

    it('GET - Listar candidato por email', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('GET/candidato/findbyemails')
            candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO').then((response) => {
                cy.wrap(response.body).as('candidato')
            })
            cy.get('@candidato').then(candidato => {candidatoService.GETcandidatoEmailRequest('testecandidato@teste.com.br')
            .should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.idCandidato).to.eq(candidato.idCandidato)
                expect(response.body.email).to.eq('testecandidato@teste.com.br');
                expect(response.body.nomeCompleto).to.eq('testeapiauto');
                expect(response.body.cidade).to.eq('teste');
                expect(response.body.estado).to.eq('teste');
                expect(response.body.trilha.nome).to.eq('QA');
                expect(response.body.genero).to.eq('MASCULINO');
                expect(response.body.notaProva).to.eq(10);
                expect(response.body.linguagens).that.is.not.empty;
            })
        })
        cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato))
    });


//////////////   GET-NEGATIVOS   //////////////
    it('GET - Tentar listar candato por email inexistente', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('GET/candidato/findbyemails')
        candidatoService.GETcandidatoEmailRequest(nomeInexistente)
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`Candidato com o e-mail especificado não existe`)
        })
    });
//////////////   POST-POSITIVOS   //////////////
    it('POST - Criar candidato', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('POST/candidato')
        candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO')
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.email).to.eq('testecandidato@teste.com.br');
            expect(response.body.nomeCompleto).to.eq('testeapiauto');
            expect(response.body.cidade).to.eq('teste');
            expect(response.body.estado).to.eq('teste');
            expect(response.body.trilha.nome).to.eq('QA');
            expect(response.body.genero).to.eq('MASCULINO');
            expect(response.body.notaProva).to.eq(10);
            expect(response.body.linguagens).that.is.not.empty;
        }).then((response) => {
            cy.wrap(response.body).as('candidato')
        })
        cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato))
    });
//////////////   POST-NEGATIVOS   //////////////
    it('POST - Tentar criar candidato com email ja cadastrado', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('POST/candidato')
        candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO')
            .then((response) => {
                cy.wrap(response.body).as('candidato')
            })
        candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO')
            .should((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq(`Candidato com este e-mail já existe no sistema.`)
            })
        cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato))
    });

    it('POST - Tentar criar candidato com email invalido', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('POST/candidato')
        candidatoService.POSTcandidatoRequest(candidatoErrorEmailTest, 'OUTRO')
            .should((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.errors[0]).to.eq(`email: must be a well-formed email address`)
            })
    });

    it('POST - Tentar criar candidato com trilha invalido', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('POST/candidato')
        candidatoService.POSTcandidatoRequest(candidatoErrorTrilhaTest, 'OUTRO')
            .should((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq(`Trilha não encontrada!`)
            })
    });

    it('POST - Tentar criar candidato com email em branco', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('POST/candidato')
        candidatoService.POSTcandidatoRequest(candidatoErrorEmailEmBrancoTest, 'OUTRO')
            .should((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq(`E-mail inválido! Deve ser inserido um endereço de email válido!`)
            })
    });
//////////////   PUT-POSITIVOS   //////////////
    it('PUT - Atualizar candidato', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/candidato')
            candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO')
            .then((response) => {
                cy.wrap(response.body).as('candidato')
            })
        cy.get('@candidato').then(candidato => candidatoService.PUTcandidatoRequest(candidatoNovoTest, candidato.idCandidato, 'FEMININO'))
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.email).to.eq('testecandidato@teste.com.br');
            expect(response.body.nomeCompleto).to.eq('testeapiauto');
            expect(response.body.cidade).to.eq('mudanca');
            expect(response.body.estado).to.eq('mudanca');
            expect(response.body.trilha.nome).to.eq('BACKEND');
            expect(response.body.genero).to.eq('FEMININO');
            expect(response.body.linguagens).that.is.not.empty;
        })
        cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato))
    });

//////////////   PUT-NEGATIVOS   //////////////
    it('PUT - Tentar atualizar candidato passando id inexistente', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/candidato')
            candidatoService.PUTcandidatoRequest(candidatoNovoTest, idInexistente, 'FEMININO')
                .should((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq(`Candidato não encontrado.`)
            })
    });

    it('PUT - Tentar atualizar candidato com email invalido', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/candidato')
            candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO')
            .then((response) => {
                cy.wrap(response.body).as('candidato')
            })
        cy.get('@candidato').then(candidato => candidatoService.PUTcandidatoRequest(candidatoErrorEmailTest, candidato.idCandidato, 'FEMININO'))
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.errors[0]).to.eq(`email: must be a well-formed email address`)
        })
        cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato))
    });

    it('PUT - Tentar atualizar candidato com trilha invalido', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/candidato')
            candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO')
            .then((response) => {
                cy.wrap(response.body).as('candidato')
            })
        cy.get('@candidato').then(candidato => candidatoService.PUTcandidatoRequest(candidatoErrorTrilhaTest, candidato.idCandidato, 'FEMININO'))
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`Trilha não encontrada!`)
        })
        cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato))
    });

    it('PUT - Tentar atualizar candidato com email em branco', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/candidato')
            candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO')
            .then((response) => {
                cy.wrap(response.body).as('candidato')
            })
        cy.get('@candidato').then(candidato => candidatoService.PUTcandidatoRequest(candidatoErrorEmailEmBrancoTest, candidato.idCandidato, 'FEMININO'))
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`E-mail inválido! Deve ser inserido um endereço de email válido!`)
        })
        cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato))
    });
//////////////   DELETE-POSITIVOS   //////////////
it('DELETE - Tornar candidato inativo', () => {
    cy.allure()
        .epic('Candidato-Controller')
        .feature('DELETE/candidato/{idCandidato}')
    candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO')
        .then((response) => {
            cy.wrap(response.body).as('candidato')
    })
    cy.get('@candidato').then(candidato => candidatoService.DELETElogicoCandidatoRequest(candidato.idCandidato))
    .should((response) => {
        expect(response.status).to.eq(204);
    })
    cy.get('@candidato').then(candidato => candidatoService.GETcandidatoEmailRequest(candidato.email))
    .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.ativo).to.eq('F')
    })
    cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato))
});

it('DELETE - Deletar usuario do sistema', () => {
    cy.allure()
        .epic('Usuario-Controller')
        .feature('DELETE/usuario/delete-fisico/{idUsuario}')
    candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO')
        .then((response) => {
            cy.wrap(response.body).as('candidato')
    })
    cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato))
    .should((response) => {
        expect(response.status).to.eq(204);
    })
    cy.get('@candidato').then(candidato => candidatoService.GETcandidatoEmailRequest(candidato.email))
    .should((response) => {
        expect(response.status).to.eq(400);
    })
});
//////////////   DELETE-NEGATIVOS   //////////////
    it('DELETE - Tentar tornar usuario inexistente inativo', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('DELETE/candidato/{idCandidato}')
            candidatoService.DELETElogicoCandidatoRequest(idInexistente)
            .should((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq(`Candidato não encontrado.`)
            })
    });

    it('DELETE - Tentar deletar usuario inexistente do sistema', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('DELETE/usuario/delete-fisico/{idUsuario}')
            candidatoService.DELETEfisicoCandidatoRequest(idInexistente)
            .should((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq(`Candidato não encontrado.`)
            })
    });
})