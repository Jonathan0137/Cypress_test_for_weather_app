describe('Basic page interactions', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000');

        cy.get('input[type="text"]:nth-child(1)')
            .as('searchbar_city')

        cy.get('input[type="text"]:nth-child(2)')
            .as('searchbar_country')

        cy.get('div[class="title"]')
            .as('title')

        cy.get('button[class="btn btn-primary"]')
            .as('get_weather_button')

        cy.get('h1[class="country"]')
            .as('content_country')

        cy.get('h1[class="icon"]')
            .as('content_icon')
        
        cy.get('h1[class="degree"]')
            .as('content_degree')
        
        cy.get('h4[class="description"]')
            .as('content_description')

        cy.get('h4[class="humidity"]')
            .as('content_humidity')

        cy.get('h1[class="error"]')
            .as('content_error')

    })

    it('check the heading has the correct title', ()=>{
        cy.get('@title').should('be.visible')
        cy.get('@title').invoke('text').should('equal', 'Weather Finder')
    })

    it('content class should not be visible', ()=>{
        cy.get('@content_country').should('not.be.visible')
        cy.get('@content_icon').should('not.be.visible')
        cy.get('@content_degree').should('not.be.visible')
        cy.get('@content_description').should('not.be.visible')
        cy.get('@content_humidity').should('not.be.visible')
        cy.get('@content_error').should('not.be.visible')
    })

    it('check the search bar contains all text before clicking', ()=>{

        cy.get('@searchbar_city')
            .should('be.visible')

        cy.get('@searchbar_country')
            .should('be.visible')

        cy.get('@get_weather_button')
            .should('be.visible')
            .invoke('text')
            .should('equal', 'Get Weather')

    })

    it('check you are able to press the get weather button', ()=>{
        cy.get('@get_weather_button')
            .click()
        cy.get('@content_icon')
            .should('be.visible')
        
        cy.get('@content_error')
            .invoke('text')
            .should('equal', 'Please Enter The Correct Location')

        cy.get('@content_country').should('not.be.visible')
        cy.get('@content_degree').should('not.be.visible')
        cy.get('@content_description').should('not.be.visible')
        cy.get('@content_humidity').should('not.be.visible')
    })

  it('check a valid location and returns correct data', ()=>{
        const valid_city = "Toronto"
        const valid_country = "CA"

        cy.get('@searchbar_city')
            .type(valid_city)

        cy.get('@searchbar_country')
            .type(valid_country)

        cy.get('@get_weather_button')
            .click()
        
        cy.get('@content_country')
            .invoke('text')
            .should('contain', valid_city)
            .should('contain', valid_country)

        cy.get('@content_icon').should('be.visible')
        cy.get('@content_degree').should('be.visible')
        cy.get('@content_description').should('be.visible')
        cy.get('@content_humidity').should('be.visible')
        cy.get('@content_error').should('not.be.visible')
    })  

    it('check an invalid location and returns error message', ()=>{
        const invalid_city = "blahbalah"
        const invalid_country = "heyheyhey"

        cy.get('@searchbar_city')
            .type(invalid_city)

        cy.get('@searchbar_country')
            .type(invalid_country)

        cy.get('@get_weather_button')
            .click()

        cy.get('@content_icon')
            .should('be.visible')
        
        cy.get('@content_error')
            .invoke('text')
            .should('equal', 'Please Enter The Correct Location')

        cy.get('@content_country').should('not.be.visible')
        cy.get('@content_degree').should('not.be.visible')
        cy.get('@content_description').should('not.be.visible')
        cy.get('@content_humidity').should('not.be.visible')
    })


})