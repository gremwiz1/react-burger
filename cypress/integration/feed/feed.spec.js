describe('service is available on route feed', function () {
    before(function () {
        cy.visit('http://localhost:3000/feed');
    });

    it('should feed contains', function () {
        cy.contains('Лента заказов');
        cy.contains('Выполнено за все время');
        cy.contains('Выполнено за сегодня');
    });
});
