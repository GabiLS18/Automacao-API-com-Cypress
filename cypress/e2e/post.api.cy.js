/// <reference types="cypress"/>

describe('Cadastro de dispositivos', () => {
    
    const payload_cadastro_device = require('../fixtures/cadastrar_device_sucesso.json')

    it('Cadastrar um dispositivo', () => {

        cy.cadastrarDevice(payload_cadastro_device)
           .then((response) => {
            expect(response.status).equal(200)
            expect(response.body.id).not.empty
            expect(response.body.createdAt).not.string
            expect(response.body.name).equal("Celular Teste")

            expect(response.body.data.year).not.string
            expect(response.body.data.year).equal(2025)

            expect(response.body.data.price).not.string
            expect(response.body.data.price).equal(1849.99)

            expect(response.body.data['CPU model']).not.empty
            expect(response.body.data['CPU model']).equal('Intel Core i9')

            expect(response.body.data['Hard disk size']).not.empty
            expect(response.body.data['Hard disk size']).equal('500 GB')

            expect(response.body.data.owner).not.empty
            expect(response.body.data.owner).equal('Qazando LTDA')

        })
    })
})

    it('Cadastrar um dispositivo sem mandar dados', () => {  

        cy.cadastrarDevice('')
          .then((response) => {
            expect(response.status).equal(400)
            expect(response.body.error).equal("Request body is missing")   

        })
    })
