import CandidatoService from "../../service/candidatoService";
const candidatoService = new CandidatoService();
import LoginService from "../../service/loginService";
const loginService = new LoginService();
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
            loginService.Login()
            .then((login) => {
                candidatoService.GETcandidatoRequest(login.body)
                    .should((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.elementos).that.is.not.empty;
                    })
            })
    });

    it('GET - Listar candidato por email', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('GET/candidato/findbyemails')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body).then((response) => {
                    cy.wrap(response.body).as('candidato')
                })
                cy.get('@candidato').then(candidato => {candidatoService.GETcandidatoEmailRequest('testecandidato@teste.com.br', login.body)
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
                cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
            })
    });

    it('GET - Listar candidatos por nome ou trilha', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('GET/candidato/listar-candidato-principal-por-nome-ou-por-trilha')
            loginService.Login()
            .then((login) => {
                candidatoService.GETcandidatoListaPrincipal("Chico duarte", "QA", login.body)
                    .should((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.elementos).that.is.not.empty;
                    })
            })
    });

//////////////   GET-NEGATIVOS   //////////////
    it('GET - Tentar listar candato por email inexistente', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('GET/candidato/findbyemails')
            loginService.Login()
            .then((login) => {
                candidatoService.GETcandidatoEmailRequest(nomeInexistente, login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.message).to.eq(`Candidato com o e-mail especificado não existe`)
                    })
            })
    });
//////////////   POST-POSITIVOS   //////////////
    it('POST - Criar candidato', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('POST/candidato')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body)
                    .should((response) => {
                        expect(response.status).to.eq(201);
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
                cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
            })
    });
//////////////   POST-NEGATIVOS   //////////////
    it('POST - Tentar criar candidato com email ja cadastrado', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('POST/candidato')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body)
            .then((response) => {
                cy.wrap(response.body).as('candidato')
            })
            candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body)
                .should((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body.message).to.eq(`Candidato com este e-mail já existe no sistema.`)
                })
            cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
            })
    });

    it('POST - Tentar criar candidato com email invalido', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('POST/candidato')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoErrorEmailTest, 'OUTRO', login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.errors[0]).to.eq(`email: must be a well-formed email address`)
                    })
            })
    });

    it('POST - Tentar criar candidato com trilha invalido', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('POST/candidato')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoErrorTrilhaTest, 'OUTRO', login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.message).to.eq(`Trilha não encontrada!`)
                    })
            })
    });

    it('POST - Tentar criar candidato com email em branco', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('POST/candidato')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoErrorEmailEmBrancoTest, 'OUTRO', login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.message).to.eq(`E-mail inválido! Deve ser inserido um endereço de email válido!`)
                    })
            })
    });
//////////////   PUT-POSITIVOS   //////////////
    it('PUT - Atualizar candidato', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/candidato')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body)
            .then((response) => {
                cy.wrap(response.body).as('candidato')
            })
            cy.get('@candidato').then(candidato => candidatoService.PUTcandidatoRequest(candidatoNovoTest, candidato.idCandidato, 'FEMININO', login.body))
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
            cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
            })
    });

//////////////   PUT-NEGATIVOS   //////////////
    it('PUT - Tentar atualizar candidato passando id inexistente', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/candidato')
            loginService.Login()
            .then((login) => {
                candidatoService.PUTcandidatoRequest(candidatoNovoTest, idInexistente, 'FEMININO', login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.message).to.eq(`Candidato não encontrado.`)
                    })
            })  
    });

    it('PUT - Tentar atualizar candidato com email invalido', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/candidato')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body)
            .then((response) => {
                cy.wrap(response.body).as('candidato')
            })
                cy.get('@candidato').then(candidato => candidatoService.PUTcandidatoRequest(candidatoErrorEmailTest, candidato.idCandidato, 'FEMININO', login.body))
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.errors[0]).to.eq(`email: must be a well-formed email address`)
                    })
                cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
            })
    });

    it('PUT - Tentar atualizar candidato com trilha invalido', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/candidato')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body)
            .then((response) => {
                cy.wrap(response.body).as('candidato')
            })
            cy.get('@candidato').then(candidato => candidatoService.PUTcandidatoRequest(candidatoErrorTrilhaTest, candidato.idCandidato, 'FEMININO', login.body))
                .should((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body.message).to.eq(`Trilha não encontrada!`)
                })
            cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
            })
    });

    it('PUT - Tentar atualizar candidato com email em branco', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/candidato')
            loginService.Login()
            .then((login) => {
                candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body)
            .then((response) => {
                cy.wrap(response.body).as('candidato')
            })
            cy.get('@candidato').then(candidato => candidatoService.PUTcandidatoRequest(candidatoErrorEmailEmBrancoTest, candidato.idCandidato, 'FEMININO', login.body))
                .should((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body.message).to.eq(`E-mail inválido! Deve ser inserido um endereço de email válido!`)
                })
            cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
            })
    });
//////////////   DELETE-POSITIVOS   //////////////
    it('DELETE - Tornar candidato inativo', () => {
        cy.allure()
            .epic('Candidato-Controller')
            .feature('DELETE/candidato/{idCandidato}')
            loginService.Login()
                .then((login) => {
                    candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body)
                    .then((response) => {
                        cy.wrap(response.body).as('candidato')
                    })
                    cy.get('@candidato').then(candidato => candidatoService.DELETElogicoCandidatoRequest(candidato.idCandidato, login.body))
                    .should((response) => {
                        expect(response.status).to.eq(204);
                    })
                    cy.get('@candidato').then(candidato => candidatoService.GETcandidatoEmailRequest(candidato.email, login.body))
                    .should((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.ativo).to.eq('F')
                    })
                    cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
                })
    });

    it('DELETE - Deletar usuario do sistema', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('DELETE/usuario/delete-fisico/{idUsuario}')
            loginService.Login()
                .then((login) => {
                    candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', login.body)
                        .then((response) => {
                            cy.wrap(response.body).as('candidato')
                        })
                        cy.get('@candidato').then(candidato => candidatoService.DELETEfisicoCandidatoRequest(candidato.idCandidato, login.body))
                            .should((response) => {
                                expect(response.status).to.eq(204);
                        })
                        cy.get('@candidato').then(candidato => candidatoService.GETcandidatoEmailRequest(candidato.email, login.body))
                            .should((response) => {
                                expect(response.status).to.eq(400);
                        })
                })
    });
//////////////   DELETE-NEGATIVOS   //////////////
    it('DELETE - Tentar tornar usuario inexistente inativo', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('DELETE/candidato/{idCandidato}')
            loginService.Login()
            .then((login) => {
                candidatoService.DELETElogicoCandidatoRequest(idInexistente, login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.message).to.eq(`Candidato não encontrado.`)
                    })
            })
    });

    it('DELETE - Tentar deletar usuario inexistente do sistema', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('DELETE/usuario/delete-fisico/{idUsuario}')
            loginService.Login()
            .then((login) => {
                candidatoService.DELETEfisicoCandidatoRequest(idInexistente, login.body)
                    .should((response) => {
                        expect(response.status).to.eq(400);
                        expect(response.body.message).to.eq(`Candidato não encontrado.`)
                    })
            })
    });
})