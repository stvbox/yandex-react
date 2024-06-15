

const PROJECT_URL = 'https://stvbox.github.io/yandex-react/';

describe('service is available', function () {

    before(function () {
        cy.viewport(1300, 600);
    });

    //ingredients-list-item-main
    it('Модальное окно ингридиента открывается и закрывается, наименование соответствует', () => {
        cy.visit(PROJECT_URL);

        const categoryItem = cy.get('[data-cy="ingredients-list-item-main"]', { timeout: 20000 }).first();
        categoryItem.click();

        cy.get('[data-cy="modal-window"]', { timeout: 20000 })
            .should('be.visible');

        categoryItem.find('[data-cy="ingredients-list-item-name"]').then(($listNameElement) => {
            const name = $listNameElement.text()
            cy.get('[data-cy="ingredient-details-name"]').should('have.text', name);
        });

        cy.get('[data-cy="modal-window-close"]').click();

        cy.get('[data-cy="modal-window"]', { timeout: 1000 }).should('not.exist');
    });

    it('Заказ отправляется и во всплывающем окне все хорошо, модальное окно всплывает и закрывается', () => {
        cy.visit(PROJECT_URL);

        cy.wait(2000)
        makeSimpleSet();

        cy.get('[data-cy="checkout-button"]').click();

        cy.wait(1000)

        cy.get('[data-cy="form-field-email"]').as('login');
        cy.get('[data-cy="form-field-password"]').as('password');
        cy.get('[data-cy="form-button-submit"]').as('submit');

        cy.get('@login').type("stvbox@yandex.ru");
        cy.get('@password').type("1");

        cy.wait(1000);

        cy.get('@submit').click();

        cy.wait(1000);

        cy.get('[data-cy="checkout-button"]').click();

        cy.get('[data-cy="order-ready-marker"]', { timeout: 20000 })
            .should('be.visible');

        cy.get('[data-cy="modal-window-close"]').click();

        cy.get('[data-cy="modal-window"]', { timeout: 1000 }).should('not.exist');
    });

    it('Сумма отображается верно', () => {
        cy.visit(PROJECT_URL);

        cy.wait(2000)
        makeSimpleSet();

        let totalPrice = 0;
        cy.get('.constructor-element__price').each($el => {
            totalPrice += Number.parseInt($el.text());
        });

        cy.get("[data-cy='total-summ']").then(total => {
            if (Number(total.text()) != totalPrice) {
                throw new Error('Суммы не сходятся');
            }
        });
    });

});

const makeSimpleSet = () => {
    const buns = cy.get("[data-cy='ingredients-list-item-bun']", { timeout: 10000 })
        .should('be.visible');
    buns.first().trigger("dragstart");
    cy.get("[data-cy='drop-zone']").trigger("drop");
    cy.get("[data-cy='constructor-item-top']").should('have.length', 1);

    const mains = cy.get("[data-cy='ingredients-list-item-main']", { timeout: 10000 })
        .should('be.visible');
    mains.first().trigger("dragstart");
    cy.get("[data-cy='constructor-item-top']").trigger("drop");
    cy.get("[data-cy='constructor-item-main']").should('have.length', 1);
};


async function dragAndDrop(browser, $element, $destination) {
    await browser.actions().mouseMove($element).perform();
    await browser.actions().mouseDown($element).perform();
    await browser.actions().mouseMove({ x: 10, y: 0 }).perform();
    await browser.actions().mouseMove($destination).perform();
    return browser.actions().mouseUp().perform();
}