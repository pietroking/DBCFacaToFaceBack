import CandidatoService from "../../service/candidatoService";
const candidatoService = new CandidatoService();
import UsuarioService from "../../service/usarioService";
const usuarioService = new UsuarioService();
import EntrevistaService from "../../service/entrevistaService";
const entrevistaService = new EntrevistaService();
const candidatoTest = require('../../../fixtures/candidato.payload.json');
const usuarioTest = require('../../../fixtures/usuario.payload.json');
const entrevistaTest = require('../../../fixtures/entrevista.payload.json');


context('Contrato GET/candidato', () => {

    it('Contrato - Validar contrato get candidato', () => {
        cy.allure().epic('Contrato candidato');
        cy.login()
        .then((response) => {
            candidatoService.contratoGetCandidato('getCandidato.contrato', response.body)})
    });

    it('Contrato - Validar contrato get candidato findbyemail', () => {
        cy.allure().epic('Contrato candidato');
        cy.login()
        .then((response) => {
            candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', response.body).then((candidato) => {
                candidatoService.contratoGetCandidatoEmail('getCandidatoFindbyemail.contrato', candidato.body.email, response.body)
                candidatoService.DELETEfisicoCandidatoRequest(candidato.body.idCandidato, response.body)
            })
        })
    });

    it('Contrato - Validar contrato get candidato lista principal', () => {
        cy.allure().epic('Contrato candidato');
        cy.login()
        .then((response) => {
            candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', response.body).then((candidato) => {
                candidatoService.contratoGetCandidatoListaPrincipal('getCandidatoListarPrincipal.contrato', candidato.body.nomeCompleto, candidato.body.trilha.nome, response.body)
                candidatoService.DELETEfisicoCandidatoRequest(candidato.body.idCandidato, response.body)
            })
        })
    });

    // it.only('Contrato - Validar contrato get candidato lista cadastro', () => {
    //     cy.allure().epic('Contrato candidato');
    //     cy.login()
    //     .then((response) => {
    //         candidatoService.contratoGetCandidatoListaCadastro('getCandidatoListarCadastro.contrato', 'Julio Rocha', 'BACKEND', response.body)
    //     })
    // });
    
    it('Contrato - Validar contrato get candidato curriculo', () => {
        cy.allure().epic('Contrato candidato');
        cy.login()
        .then((response) => {
            candidatoService.contratoGetCandidatoCurriculo('getCandidatoCurriculo.contrato', 'julio.gabriel@dbccompany.com.br', response.body)
        })
    });

    // it('Contrato - Validar contrato get candidato imagem', () => {
    //     cy.allure().epic('Contrato candidato');
    //     cy.login()
    //     .then((response) => {
    //         candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', response.body).then((candidato) => {
    //             candidatoService.contratGETcandidatoRecuperarImagemRequest('getCandidatoImagem.contrato', candidato.body.email, response.body)
    //             candidatoService.DELETEfisicoCandidatoRequest(candidato.body.idCandidato, response.body)
    //         })
    //     })
    // });
})

context('Contrato GET/usuario', () => {
    it('Contrato - Validar contrato get usuario', () => {
        cy.allure().epic('Contrato usuario');
        cy.login()
        .then((response) => {
            usuarioService.contratoGetUsuario('getUsuario.contrato', response.body)})
    });

    it('Contrato - Validar contrato get usuario logado', () => {
        cy.allure().epic('Contrato usuario');
        cy.login()
        .then((response) => {
            usuarioService.contratoGetUsuarioLogado('getUsuarioLogado.contrato', response.body)})
    });

    it('Contrato - Validar contrato get usuario idUsuario', () => {
        cy.allure().epic('Contrato usuario');
        cy.login()
        .then((response) => {
            usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO', response.body).then((usuario) => {
                usuarioService.contratoGetUsuarioId('getUsuarioId.contrato', response.body, usuario.body.idUsuario)
                usuarioService.DELETEfisicoUsuarioRequest(usuario.body.idUsuario, response.body)
            })
        }) 
    });

    it('Contrato - Validar contrato get usuario email', () => {
        cy.allure().epic('Contrato usuario');
        cy.login()
        .then((response) => {
            usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO', response.body).then((usuario) => {
                usuarioService.contratoGetUsuarioEmail('getUsuarioEmail.contrato', response.body, usuario.body.email)
                usuarioService.DELETEfisicoUsuarioRequest(usuario.body.idUsuario, response.body)
            })
        })
    });

    it('Contrato - Validar contrato get usuario nome', () => {
        cy.allure().epic('Contrato usuario');
        cy.login()
        .then((response) => {
            usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO', response.body).then((usuario) => {
                usuarioService.contratoGetUsuarioNome('getUsuarioFindbynomecompleto.contrato', response.body, usuario.body.nomeCompleto)
                usuarioService.DELETEfisicoUsuarioRequest(usuario.body.idUsuario, response.body)
            }) 
        })
    });

    it('Contrato - Validar contrato get usuario imagem', () => {
        cy.allure().epic('Contrato usuario');
        cy.login()
        .then((response) => {
                usuarioService.contratoGetUsuarioImagem('getUsuarioImagem.contrato', response.body, 'julio.gabriel@dbccompany.com.br')})
        })
})

context('Contrato GET/entrevista', () => {
    it('Contrato - Validar contrato get entrevista', () => {
        cy.allure().epic('Contrato entrevista');
        cy.login()
        .then((response) => {
            entrevistaService.contratoGetEntrevista('getEntrevista.contrato', response.body)})
    });

    it('Contrato - Validar contrato get entrevista por mes/ano', () => {
        cy.allure().epic('Contrato entrevista');
        cy.login()
        .then((response) => {
            candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', response.body).then((candidato) => {
                entrevistaService.POSTentrevistaRequest(entrevistaTest, response.body).then((entrevista) => {
                    entrevistaService.contratoGetEntrevistaMes('getListarPorMes.contrato', response.body, 12, 2022)
                    entrevistaService.DELETEentrevistaRequest(entrevista.body.idEntrevista, response.body)
                    candidatoService.DELETEfisicoCandidatoRequest(candidato.body.idCandidato, response.body)
                })
            })
        })    
    });

    it('Contrato - Validar contrato get entrevista por email candidato', () => {
        cy.allure().epic('Contrato entrevista');
        cy.login()
        .then((response) => {
            candidatoService.POSTcandidatoRequest(candidatoTest, 'MASCULINO', response.body).then((candidato) => {
                entrevistaService.POSTentrevistaRequest(entrevistaTest, response.body).then((entrevista) => {
                    entrevistaService.contratoGetEntrevistaEmailCandidato('getEntrevistaEmailCandidato.contrato', response.body, candidato.body.email)
                    entrevistaService.DELETEentrevistaRequest(entrevista.body.idEntrevista, response.body)
                    candidatoService.DELETEfisicoCandidatoRequest(candidato.body.idCandidato, response.body)
                })
            })
        })
    });
})