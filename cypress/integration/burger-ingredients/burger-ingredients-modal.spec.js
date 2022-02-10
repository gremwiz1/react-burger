describe('burger ingredients exist, open and close modal window', function () {
    before(function () {
        cy.visit('http://localhost:3000');
    });

    it('should exist words', function () {
        cy.contains('Булки');
        cy.contains('Соусы');
        cy.contains('Начинки');
    });
    it('should open modal window', function () {
        cy.contains('Соус традиционный галактический').click();
        cy.contains('Детали ингредиента');
        cy.url().should('include', '/ingredients/');
    });
    it('should close the modal window', function () {
        cy.get('[class^=CloseIcon]').click();
        cy.contains('Детали ингредиента').should('not.exist');
        cy.url().should('not.include', '/ingredients/');
    });

});