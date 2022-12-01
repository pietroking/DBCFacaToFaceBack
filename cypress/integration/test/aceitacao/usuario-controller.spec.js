import UsuarioService from "../../service/usarioService";
const usuarioService = new UsuarioService();
const idInexistente = 9999;
const nomeInexistente = 'ahahahahahaha';
const usuarioTest = require('../../../fixtures/usuario.payload.json');
const usuarioNovoTest = require('../../../fixtures/usuarioAtualizado.payload.json');
const usuarioErrorTrilhaTest = require('../../../fixtures/usuarioErrorTrilha.payload.json');
const usuarioErrorPerfilTest = require('../../../fixtures/usuarioErrorPerfil.payload.json');
// const foto = cy.fixture('goku.jpg', 'base64').then(content => {
//     cy.get('input').upload(content, 'myfile.jpg', 'image/jpeg')})



context('Usuario-Controller', () => {
//////////////   GET-POSITIVOS   //////////////
    it('GET - Visualizar usuario logado', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('GET/usuario/logado')
        usuarioService.GETusuarioLogadoRequest()
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).that.is.not.empty;
            expect(response.body.email).to.eq('julio.gabriel@dbccompany.com');
            expect(response.body.nomeCompleto).to.eq('ADMIN');
            expect(response.body.perfis).that.is.not.empty;
        })
    });

    it('GET - Listar usuarios', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('GET/usuario')
        usuarioService.GETusuarioRequest()
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.elementos).that.is.not.empty;
            expect(response.body.elementos[0].email).to.eq('julio.gabriel@dbccompany.com');
            expect(response.body.elementos[0].nomeCompleto).to.eq('ADMIN');
            expect(response.body.elementos[0].perfis).that.is.not.empty;
        })
    });

    it('GET - Listar usuario por ID', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('GET/usuario/id')
        usuarioService.GETusuarioIdRequest(1)
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.email).to.eq('julio.gabriel@dbccompany.com');
            expect(response.body.nomeCompleto).to.eq('ADMIN');
            expect(response.body.cidade).to.eq('PORTO ALEGRE');
            expect(response.body.estado).to.eq('RIO GRANDE DO SUL');
            expect(response.body.trilha.nome).to.eq('COLABORADOR');
            expect(response.body.genero).to.eq('MASCULINO');
            expect(response.body.idUsuario).to.eq(1);
        })
    });

    it('GET - Listar usuario por email', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('GET/usuario/email')
        usuarioService.GETusuarioEmailRequest('julio.gabriel@dbccompany.com')
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.email).to.eq('julio.gabriel@dbccompany.com');
            expect(response.body.nomeCompleto).to.eq('ADMIN');
            expect(response.body.cidade).to.eq('PORTO ALEGRE');
            expect(response.body.estado).to.eq('RIO GRANDE DO SUL');
            expect(response.body.trilha.nome).to.eq('COLABORADOR');
            expect(response.body.genero).to.eq('MASCULINO');
            expect(response.body.idUsuario).to.eq(1);
        })
    });

    it('GET - Listar usuarios por nome', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('GET/usuario/findbynomecompleto')
        usuarioService.GETusuarioNomeRequest('ADMIN')
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.elementos).that.is.not.empty;
        })
    });

    it('GET - Recuperar imagem de usuario', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('GET/usuario/recuperar-imagem')
        usuarioService.GETusuarioRecuperarImagemRequest('')
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.elementos).that.is.not.empty;
        })
    });
//////////////   GET-NEGATIVOS   //////////////
    it('GET - Tentar listar usuario por ID inexistente', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('GET/usuario/id')
        usuarioService.GETusuarioIdRequest(idInexistente)
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`Usuário com id ${idInexistente} não foi encontrado.`)
        })
    });

    it('GET - Tentar listar usuario por email inexistente', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('GET/usuario/email')
        usuarioService.GETusuarioEmailRequest(nomeInexistente)
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`Usuário com o e-mail especificado não existe`)
        })
    });

    it('GET - Tentar listar usuarios por nome inexistente', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('GET/usuario/findbynomecompleto')
        usuarioService.GETusuarioNomeRequest(nomeInexistente)
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`Usuário com o nome especificado não existe`)
        })
    });
//////////////   POST-POSITIVOS   //////////////
    it('POST - Criar usuario', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('POST/usuario')
        usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO')
        .should((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.email).to.eq('pietro.bianchi@dbccompany.com.br');
            expect(response.body.nomeCompleto).to.eq('testeapiauto');
            expect(response.body.cidade).to.eq('teste');
            expect(response.body.estado).to.eq('teste');
            expect(response.body.trilha.nome).to.eq('QA');
            expect(response.body.genero).to.eq('MASCULINO');
        }).then((response) => {
            cy.wrap(response.body).as('usuario')
        })
        cy.get('@usuario').then(usuario => usuarioService.DELETEfisicoUsuarioRequest(usuario.idUsuario))
    });
//////////////   POST-NEGATIVOS   //////////////
    it('POST - Tentar criar usuario com email ja cadastrado', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('POST/usuario')
        usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO').then((response) => {
            cy.wrap(response.body).as('usuario')
        })
        usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO')
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`Usuário já cadastrado com o mesmo email.`)
        })
        
        cy.get('@usuario').then(usuario => usuarioService.DELETEfisicoUsuarioRequest(usuario.idUsuario))
    });

    it('POST - Tentar criar usuario passando trilha errada', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('POST/usuario')
        usuarioService.POSTusuarioRequest(usuarioErrorTrilhaTest, 'MASCULINO')
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`Trilha não encontrada!`)
        })
    });

    it('POST - Tentar criar usuario passando perfil errado', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('POST/usuario')
        usuarioService.POSTusuarioRequest(usuarioErrorPerfilTest, 'MASCULINO')
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`Perfil não encontrado!`)
        })
    });
//////////////   PUT-POSITIVOS   //////////////
    it('PUT - Atualizar usuario', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/usuario')
        usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO').then((response) => {
            cy.wrap(response.body).as('usuario')
        })
        cy.get('@usuario').then(usuario => usuarioService.PUTusuarioRequest(usuarioNovoTest, usuario.idUsuario, 'FEMININO'))
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.email).to.eq('pietro.bianchi@dbccompany.com.br');
            expect(response.body.nomeCompleto).to.eq('testeapiauto');
            expect(response.body.cidade).to.eq('mudanca');
            expect(response.body.estado).to.eq('mudanca');
            expect(response.body.trilha.nome).to.eq('BACKEND');
            expect(response.body.genero).to.eq('FEMININO');
        })
        cy.get('@usuario').then(usuario => usuarioService.DELETEfisicoUsuarioRequest(usuario.idUsuario))
    });

    // it('PUT - Upload foto', () => {
    //     cy.allure()
    //         .epic('Usuario-Controller')
    //         .feature('PUT/usuario/upload-foto')
        
    // });
//////////////   PUT-NEGATIVOS   //////////////
    it('PUT - Tentar atualizar usuario passando trilha errada', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/usuario')
        usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO').then((response) => {
            cy.wrap(response.body).as('usuario')
        })
        cy.get('@usuario').then(usuario => usuarioService.PUTusuarioRequest(usuarioErrorTrilhaTest, usuario.idUsuario, 'FEMININO'))
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`Trilha não encontrada!`)
        })
        cy.get('@usuario').then(usuario => usuarioService.DELETEfisicoUsuarioRequest(usuario.idUsuario))
    });

    it('PUT - Tentar atualizar usuario passando perfil errado', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/usuario')
        usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO').then((response) => {
            cy.wrap(response.body).as('usuario')
        })
        cy.get('@usuario').then(usuario => usuarioService.PUTusuarioRequest(usuarioErrorPerfilTest, usuario.idUsuario, 'FEMININO'))
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`Perfil não encontrado!`)
        })
        cy.get('@usuario').then(usuario => usuarioService.DELETEfisicoUsuarioRequest(usuario.idUsuario))
    });

    

    // it('PUT - Upload foto passando foto inexistente', () => {
    //     cy.allure()
    //         .epic('Usuario-Controller')
    //         .feature('PUT/usuario/upload-foto')
        
    // });
//////////////   DELETE-POSITIVOS   //////////////
    it('DELETE - Tornar usuario inativo', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('DELETE/usuario/{idUsuario}')
        usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO').then((response) => {
            cy.wrap(response.body).as('usuario')
        })
        cy.get('@usuario').then(usuario => usuarioService.DELETElogicoUsuarioRequest(usuario.idUsuario))
        .should((response) => {
            expect(response.status).to.eq(204);
        })
        cy.get('@usuario').then(usuario => usuarioService.GETusuarioIdRequest(usuario.idUsuario))
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.ativo).to.eq('F')
        })
        cy.get('@usuario').then(usuario => usuarioService.DELETEfisicoUsuarioRequest(usuario.idUsuario))
    });

    it('DELETE - Deletar usuario do sistema', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('DELETE/usuario/{idUsuario}')
        usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO').then((response) => {
            cy.wrap(response.body).as('usuario')
        })
        cy.get('@usuario').then(usuario => usuarioService.DELETEfisicoUsuarioRequest(usuario.idUsuario))
        .should((response) => {
            expect(response.status).to.eq(204);
        })
        cy.get('@usuario').then(usuario => usuarioService.GETusuarioIdRequest(usuario.idUsuario))
        .should((response) => {
            expect(response.status).to.eq(400);
        })
    });
//////////////   DELETE-NEGATIVOS   //////////////
    it('DELETE - Tentar tornar usuario inexistente inativo', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('DELETE/usuario/{idUsuario}')
            usuarioService.DELETElogicoUsuarioRequest(idInexistente)
            .should((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq(`Usuário com id ${idInexistente} não foi encontrado.`)
            })
    });

    it('DELETE - Tentar deletar usuario inexistente do sistema', () => {
        cy.allure()
            .epic('Usuario-Controller')
            .feature('DELETE/usuario/{idUsuario}')
            usuarioService.DELETEfisicoUsuarioRequest(idInexistente)
            .should((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq(`Usuário com id ${idInexistente} não foi encontrado.`)
            })
    });


    it.only('PUT - Upload foto passando email inexistente', () => {
        // const foto = cy.fixture('goku.jpg', 'binary').then(content => {
        //         // cy.get('[data-cy=upload-image]').attachFile(content, 'goku.jpg', 'image/jpeg')})
        //         cy.get('input[type="file"]').as('fileInput').attachFile('goku.jpg')})
        // cy.fixture('goku.jpg', 'binary').then(Cypress.Blob.binaryStringToBlob).then(content => {
        //     usuarioService.PUTusuarioFotoRequest(usuario.email, content)
        // const foto = cy.fixture('goku.jpg', 'binary').as('foto')
        // cy.get('input[type="file"]').then(function ($input){
        //     const blob = Cypress.Blob.base64StringToBlob(this.foto, 'image/png')
        //     $input.fileupload('add', { files: blob })
        // })
        cy.allure()
            .epic('Usuario-Controller')
            .feature('PUT/usuario/upload-foto')
        usuarioService.POSTusuarioRequest(usuarioTest, 'MASCULINO').then((response) => {
            cy.wrap(response.body).as('usuario')
        })
        cy.get('@usuario').then(usuario => {
            cy.fixture('goku.jpg', 'binary').then( image => {
            const blob = Cypress.Blob.binaryStringToBlob(image, 'image/jpg');
            // const formData = new FormData();
            // formData.append('image', blob, 'goku.jpg');
          
            usuarioService.PUTusuarioFotoRequest(usuario.email, blob)
            // cy.fixture('goku.jpg', 'binary').then( image => {
            //     const blob = Cypress.Blob.binaryStringToBlob(image, 'image/jpeg');
            //     const formData = new FormData();
            //     formData.append('image', blob, 'goku.jpg');
              
            //       cy.request(
            //         {
            //         method: 'PUT',
            //         url:`http://vemser-dbc.dbccompany.com.br:39000/vemser/facetoface-back/usuario/upload-foto`,
            //         headers:{
            //             authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmYWNldG9mYWNlLWFwaSIsImp0aSI6Imp1bGlvLmdhYnJpZWxAZGJjY29tcGFueS5jb20iLCJDQVJHT1MiOlsiUk9MRV9BRE1JTiIsIlJPTEVfSU5TVFJVVE9SIiwiUk9MRV9HRVNUQU8iXSwiaWF0IjoxNjY5ODU3Mzk2LCJleHAiOjE2NzI1MzU3OTZ9.qYu70ES9OiiorZtn_Qt7FKI7jPgYfCfbxVtqDkIJvIQ',
            //             'content-type': 'multipart/form-data'
            //         },
            //         qs: {
            //             "email":`${usuario.email}`
            //         },
            //         multipart:true, 
            //         body:formData,
            //         failOnStatusCode: false
            //       })
            //     })
        .should((response) => {
            expect(response.status).to.eq(200);
        })})})
        cy.get('@usuario').then(usuario => usuarioService.DELETEfisicoUsuarioRequest(usuario.idUsuario))
    });
})

// cy.fixture('goku.jpg', 'binary').then( image => {
//     const blob = Cypress.Blob.binaryStringToBlob(image, 'image/png');
//     const formData = new FormData();
//     formData.append('image', blob, 'logo.png');
  
//     usuarioService.PUTusuarioFotoRequest(usuario.email, formData)
// })
// cy.fixture('goku.jpg', 'binary').then( image => {
//     const blob = Cypress.Blob.binaryStringToBlob(image, 'image/png');
//     const formData = new FormData();
//     formData.append('image', blob, 'goku.jpg');
  
//       cy.request({
//         method: 'POST', 
//         url: '/api/upload',
//         body: formData,
//         headers: {
//           'content-type': 'multipart/form-data'
//         },
//       })
//     })
// cy.fixture('Images/G.png').as('photo')
//         cy.get('input[type="file"]').then(function (input){
//             const blob = Cypress.Blob.base64StringToBlob(this.photo, 'image/png');
//             const file = new File([blob], 'Images/G.png', {
//                type: 'image/png' 
//             })