describe('service is available on route login', function () {
    before(function () {
        cy.visit('http://localhost:3000/#/login');
    });

    it('should login contains', function () {
        cy.contains('Вход');
        cy.contains('E-mail');
        cy.contains('Пароль');
    });
});