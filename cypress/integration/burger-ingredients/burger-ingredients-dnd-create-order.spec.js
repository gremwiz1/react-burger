describe('burger ingredients drag and drop, create order', function () {
    before(function () {
        cy.visit('http://localhost:3000/#');
    });

    it('create burger', function () {
        cy.contains('Флюоресцентная булка').trigger('dragstart');
        cy.get('[data-test="burgerConstructor"]').trigger('drop');
        cy.contains('Соус традиционный галактический').trigger('dragstart');
        cy.get('[data-test="burgerConstructor"]').trigger('drop');
        cy.get('[data-test="burgerConstructor"]').contains('Флюоресцентная булка').should('exist');
        cy.get('[data-test="burgerConstructor"]').contains('Соус традиционный галактический').should('exist');
    });
    it('create order', function () {
        cy.get('button').contains('Оформить заказ').click();
        cy.url().should('include', 'http://localhost:3000/#/login');
        cy.get('input[name="email"]').type('zotov-78@mail.ru');
        cy.get('input[name="password"]').type('test1234');
        cy.contains('Войти').click();
        cy.url().should('include', 'http://localhost:3000/#');
        cy.contains('Оформить заказ').click();
        cy.contains('Ваш заказ начали готовить');
    });
    it('should close the modal window', function () {
        cy.get('[class^=CloseIcon]').click();
        cy.contains('Ваш заказ начали готовить').should('not.exist');
        cy.contains('Соберите бургер');
    });
});