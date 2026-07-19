/// <reference types="cypress"/>

describe('Alterar dispositivos', () => {


    it('Alterar um dispositivo', () => {

        const body_cadastro = {
            "name": "Celular Teste",
            "data": {
                "year": 2025,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "500 GB",
                "owner": "Qazando LTDA"
            }
        }

        const body_update = {
            "name": "Celular Teste - Update",
            "data": {
                "year": 2026,
                "price": 1900.90,
                "CPU model": "Android",
                "Hard disk size": "550 GB",
                "owner": "Qazando LTDA"
            }
        }

        cy.request({
            method: 'POST',
            url: '/objects/',
            failOnStatusCode: false,
            body: body_cadastro
        }).as('postDeviceResult')

        //pegando o result do cadastro
        //para pegar o ID
        cy.get('@postDeviceResult')
            .then((response_post) => {
                expect(response_post.status).equal(200)
                expect(response_post.body.name).equal(body_cadastro.name)

                //Fazer o PUT
                cy.request({
                    method: 'PUT',
                    url: `/objects/${response_post.body.id}`,
                    failOnStatusCode: false,
                    body: body_update
                }).as('putDeviceResult')

                //validações do PUT
                cy.get('@putDeviceResult')
                    .then((response_put) => {

                        expect(response_put.status).equal(200)
                        expect(response_put.body.name).equal(body_update.name)

                        expect(response_put.body.data.year).not.string
                        expect(response_put.body.data.year).equal(2026)

                        expect(response_put.body.data.price).not.string
                        expect(response_put.body.data.price).equal(1900.90)

                        expect(response_put.body.data['CPU model']).not.empty
                        expect(response_put.body.data['CPU model']).equal('Android')

                        expect(response_put.body.data['Hard disk size']).not.empty
                        expect(response_put.body.data['Hard disk size']).equal('550 GB')



                    })

            })
    })
})