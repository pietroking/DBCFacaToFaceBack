import LoginService from "../../service/loginService";
const loginService = new LoginService();
import CandidatoService from "../../service/candidatoService";
const candidatoService = new CandidatoService();
import EntrevistaService from "../../service/entrevistaService";
const entrevistaService = new EntrevistaService();
const idInexistente = 9999;
const candidatoTest = require('../../../fixtures/candidato.payload.json');
const candidato2Test = require('../../../fixtures/candidatoTest2.payload.json');
const entrevistaTest = require('../../../fixtures/entrevista.payload.json');
const entrevista2Test = require('../../../fixtures/entrevistaTest2.payload.json');
const entrevistaMesmaDataTest = require('../../../fixtures/entrevistaMesmaData.payload.json');
const entrevistaAtualizadaTest = require('../../../fixtures/entrevistaAtualizada.payload.json');
const entrevistaErrorUsuarioTest = require('../../../fixtures/entrevistaErrorUsuario.payload.json');
const entrevistaErrorCandidatoTest = require('../../../fixtures/entrevistaErrorCandidato.payload.json');

context('Entrevista-Controller', () => {
//////////////   GET-POSITIVOS   //////////////
    it('GET - Listar entrevistas', () => {
        cy.allure()
            .epic('Entrevista-Controller')
            .feature('GET/entrevista')
            loginService.Login()
            .then((login) => {
                entrevistaService.GETentrevistaRequest(login.body)
                    .should((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.elementos).that.is.not.empty;
                    })
            })
    });

//////////////   GET-NEGATIVOS   //////////////

//////////////   POST-POSITIVOS   //////////////
    it('POST - Criar entrevista', () => {
        cy.allure()
            .epic('Entrevista-Controller')
            .feature('POST/entrevista')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body).then((response) => {
                    cy.wrap(response.body).as('candidato')
                })
                entrevistaService.POSTentrevistaRequest(entrevistaTest, login.body)
                    .should((response) => {
                        expect(response.status).to.eq(201);
                        expect(response.body.candidatoDTO.email).to.eq('testecandidato@teste.com.br');
                        expect(response.body.candidatoDTO.nomeCompleto).to.eq('testeapiauto');
                        expect(response.body.candidatoDTO.cidade).to.eq('teste');
                        expect(response.body.candidatoDTO.estado).to.eq('teste');
                        expect(response.body.candidatoDTO.trilha.nome).to.eq('QA');
                        expect(response.body.candidatoDTO.genero).to.eq('MASCULINO');
                        expect(response.body.candidatoDTO.notaProva).to.eq(10);
                        expect(response.body.candidatoDTO.linguagens).that.is.not.empty;
                        expect(response.body.usuarioDTO.email).to.eq('julio.gabriel@dbccompany.com');
                        expect(response.body.usuarioDTO.nomeCompleto).to.eq('ADMIN');
                        expect(response.body.usuarioDTO.cidade).to.eq('PORTO ALEGRE');
                        expect(response.body.usuarioDTO.estado).to.eq('RIO GRANDE DO SUL');
                        expect(response.body.usuarioDTO.trilha.nome).to.eq('COLABORADOR');
                        expect(response.body.usuarioDTO.genero).to.eq('MASCULINO');
                        expect(response.body.usuarioDTO.perfis).that.is.not.empty;
                        expect(response.body.cidade).to.eq('string');
                        expect(response.body.estado).to.eq('string');
                }).then((response) => {
                    cy.wrap(response.body).as('entrevista')
                })
                cy.get('@entrevista').then(entrevista => entrevistaService.DELETEentrevistaRequest(entrevista.idEntrevista, login.body))
                cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
            })
    });

//////////////   POST-NEGATIVOS   //////////////
    it('POST - Tentar criar entrevista passando usuario invalido', () => {
        cy.allure()
            .epic('Entrevista-Controller')
            .feature('POST/entrevista')
            loginService.Login()
            .then((login) => {
                entrevistaService.POSTentrevistaRequest(entrevistaErrorUsuarioTest, login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.message).to.eq(`Usuário não encontrado`)
                    })
            }) 
    });

    it('POST - Tentar criar entrevista passando candidato invalido', () => {
        cy.allure()
            .epic('Entrevista-Controller')
            .feature('POST/entrevista')
            loginService.Login()
            .then((login) => {
                entrevistaService.POSTentrevistaRequest(entrevistaErrorCandidatoTest, login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.message).to.eq(`Candidato com o e-mail especificado não existe`)
                    })
            })
    });

    it('POST - Tentar criar entrevista passando um horario ja marcado', () => {
        cy.allure()
            .epic('Entrevista-Controller')
            .feature('POST/entrevista')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body).then((response) => {
                    cy.wrap(response.body).as('candidato')
                })
                candidatoService.POSTcandidatoRequest(candidato2Test, 'MASCULINO', login.body).then((response) => {
                    cy.wrap(response.body).as('candidato2')
                })
                entrevistaService.POSTentrevistaRequest(entrevistaTest, login.body).then((response) => {
                    cy.wrap(response.body).as('entrevista')
                })
                entrevistaService.POSTentrevistaRequest(entrevistaMesmaDataTest, login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.message).to.eq(`Horário já ocupado para entrevista! Agendar outro horário!`)
                })
                cy.get('@entrevista').then(entrevista => entrevistaService.DELETEentrevistaRequest(entrevista.idEntrevista, login.body))
                cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
                cy.get('@candidato2').then(candidato2 => candidatoService.DELETEfisicoCandidatoRequest(candidato2.idCandidato, login.body))
            })
    });

    it('POST - Tentar criar entrevista passando um horario ja marcado', () => {
        cy.allure()
            .epic('Entrevista-Controller')
            .feature('POST/entrevista')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body).then((response) => {
                    cy.wrap(response.body).as('candidato')
                })
                entrevistaService.POSTentrevistaRequest(entrevistaTest, login.body).then((response) => {
                    cy.wrap(response.body).as('entrevista')
                })
                entrevistaService.POSTentrevistaRequest(entrevista2Test, login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.message).to.eq(`Entrevista para o Candidato já agendada!`)
                })
                cy.get('@entrevista').then(entrevista => entrevistaService.DELETEentrevistaRequest(entrevista.idEntrevista, login.body))
                cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
            })
    });
//////////////   PUT-POSITIVOS   //////////////
    it.only('PUT - Atualizar entrevista', () => {
        cy.allure()
            .epic('Entrevista-Controller')
            .feature('PUT/entrevista')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body).then((response) => {
                    cy.wrap(response.body).as('candidato')
                })
                entrevistaService.POSTentrevistaRequest(entrevistaTest, login.body).then((response) => {
                    cy.wrap(response.body).as('entrevista')
                })
                cy.get('@entrevista').then(entrevista =>  entrevistaService.PUTentrevistaRequest(entrevistaAtualizadaTest, entrevista.idEntrevista, 'PENDENTE', login.body))
                    .should((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.candidatoDTO.email).to.eq('testecandidato@teste.com.br');
                        expect(response.body.candidatoDTO.nomeCompleto).to.eq('testeapiauto');
                        expect(response.body.candidatoDTO.cidade).to.eq('teste');
                        expect(response.body.candidatoDTO.estado).to.eq('teste');
                        expect(response.body.candidatoDTO.trilha.nome).to.eq('QA');
                        expect(response.body.candidatoDTO.genero).to.eq('MASCULINO');
                        expect(response.body.candidatoDTO.notaProva).to.eq(10);
                        expect(response.body.candidatoDTO.linguagens).that.is.not.empty;
                        expect(response.body.usuarioDTO.email).to.eq('julio.gabriel@dbccompany.com');
                        expect(response.body.usuarioDTO.nomeCompleto).to.eq('ADMIN');
                        expect(response.body.usuarioDTO.cidade).to.eq('PORTO ALEGRE');
                        expect(response.body.usuarioDTO.estado).to.eq('RIO GRANDE DO SUL');
                        expect(response.body.usuarioDTO.trilha.nome).to.eq('COLABORADOR');
                        expect(response.body.usuarioDTO.genero).to.eq('MASCULINO');
                        expect(response.body.usuarioDTO.perfis).that.is.not.empty;
                        expect(response.body.cidade).to.eq('string');
                        expect(response.body.estado).to.eq('string');
                    })
                cy.get('@entrevista').then(entrevista => entrevistaService.DELETEentrevistaRequest(entrevista.idEntrevista, login.body))
                cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
            })
            
    });
//////////////   PUT-NEGATIVOS   //////////////
    it('PUT - Tentar atualizar entrevista', () => {
            cy.allure()
                .epic('Entrevista-Controller')
                .feature('PUT/entrevista')
                loginService.Login()
            .then((login) => {
                entrevistaService.PUTentrevistaRequest(entrevistaAtualizadaTest, idInexistente, 'PENDENTE', login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                    })
            })
    });
//////////////   DELETE-POSITIVOS   //////////////
    it('DELETE - Deletar entrevista', () => {
        cy.allure()
            .epic('Entrevista-Controller')
            .feature('DELETE/entrevista')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body).then((response) => {
                    cy.wrap(response.body).as('candidato')
                })
                entrevistaService.POSTentrevistaRequest(entrevistaTest, login.body).then((response) => {
                    cy.wrap(response.body).as('entrevista')
                })
                cy.get('@entrevista').then(entrevista => entrevistaService.DELETEentrevistaRequest(entrevista.idEntrevista, login.body))
                .should((response) => {
                    expect(response.status).to.eq(204);
                })
                cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
            })
    });
//////////////   DELETE-NEGATIVOS   //////////////
    it('DELETE - Deletar entrevista com id inexistente', () => {
        cy.allure()
            .epic('Entrevista-Controller')
            .feature('DELETE/entrevista')
            loginService.Login()
            .then((login) => {
                entrevistaService.DELETEentrevistaRequest(idInexistente, login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.message).to.eq(`Entrevista não encontrada!`)
                    })
            })
    });
})