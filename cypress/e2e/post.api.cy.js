/// <reference types="cypress"/>

describe('Cadastro de dispositivos', () => {


    it('Cadastrar um dispositivo', () => {

        const body = {
            "name": "Celular Teste",
            "data": {
                "year": 2025,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "500 GB",
                "owner": "Qazando LTDA"
            }
        }

        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects/',
            failOnStatusCode: false,
            body: body
        }).as('postDeviceResult')

        //validações
        cy.get('@postDeviceResult')
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