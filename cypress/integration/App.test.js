const mockTasks = [
    {
        task: 'Сходить за хлебом',
        priority: 'priority1',
        divClass: '.todos_IU',
    },
    {
        task: 'Построить дом',
        priority: 'priority2',
        divClass: '.todos_INU',
    },
    {
        task: 'Вырастить сына',
        priority: 'priority2',
        divClass: '.todos_INU',
    },
    {
        task: 'Посадить дерево',
        priority: 'none',
        divClass: '.todos_other',
    },
]

describe('Тест Портфолио', () => {

    it('Открыть сайт', () => {
        cy.visit('/');
        cy.get('[data-cy="NavBar"]').should('not.exist');
        cy.get('.Portfolio').parent('[data-cy="NavBar"]').should('not.exist');
    })

    it('Проверка загрузки приложения', () => {
        cy.get('.works > div').should('have.length', 6);
        cy.get('.works').contains('Github Repo');
        cy.get('.profile__filter input').should('be.empty');
        cy.get('.profile__sort select').should('have.value', 'id');
    })

    it('Выбрать технологию TypeScript', () => {
        cy.get('.profile__filter input').type('type');
        cy.get('.works > div').should('have.length', 2).contains('TypeScript');
    })

    describe('Проверка приложения Todo', () => {

        it('Загрузка Todo и проверка загрузки', () => {
            cy.get('.works a[href="/todo"] button').click();
            cy.get('.Todo').parent('[data-cy="NavBar"]');
            cy.get('[data-cy="TodoForm"] input').should('be.empty');
            cy.get('[data-cy="TodoForm"] button').should('have.attr', 'color');
            cy.get('[data-cy="TodoForm"] select').should('have.value', 'none');
            cy.get('[data-cy="TodoList"]');
            cy.get('[data-cy="TodoDone"]');
        })

        it('Добавить задачи', () => {
            for (let i = 0; i < mockTasks.length; i++) {
                cy.get('[data-cy="TodoForm"] input').type(mockTasks[i].task);
                cy.get('[data-cy="TodoForm"] button').should('not.have.attr', 'color');
                cy.get('[data-cy="TodoForm"] select').select(mockTasks[i].priority);
                cy.get('[data-cy="TodoForm"]').submit();
                cy.get(mockTasks[i].divClass).contains(mockTasks[i].task);
            }
            cy.get('.todos_INU .Task').should('have.length', 2);
            cy.get('.todos_UU').contains('пусто');
        })

        it('Перемещение задач', () => {
            cy.get('.todos_INU .Task:eq(0) select').select('priority1');
            cy.get('.todos_INU .Task:eq(0) select').select('priority3');
            cy.get('.todos_INU').contains('пусто');
            cy.get('.todos_IU .Task').should('have.length', 2);
        })

        it('Изменение задач', () => {
            cy.get('.todos_IU .Task:eq(0) p').click().get('textarea').clear().type('Освоить Cypress');
            cy.get('.todos_IU [data-cy="OK"]').click();
            cy.get('.todos_IU').contains('Освоить Cypress');
        })

        it('Отметить Важные Срочные как готовые', () => {
            cy.get('.todos_IU .Task input[type="checkbox"]').check();
            cy.get('.todos_IU').contains('пусто');
        })

        it('Отметить Другие как отмененные', () => {
            cy.get('.todos_other .Task button').click();
            cy.get('.todos_other').contains('пусто');
        })

        it('Проверить содержимое Сделано', () => {
            cy.get('[data-cy="TodoDone"]').click({ multiple: true }).should('not.have.text', 'пусто');
            cy.get('[data-cy="TodoDone"]').first().contains('Освоить Cypress')
            cy.get('[data-cy="TodoDone"]').first().contains('Построить дом');
            cy.get('[data-cy="TodoDone"]').last().contains('Посадить дерево');
        })

        it('Очистить список сделанного и отмененного', () => {
            cy.get('[data-cy="TodoDone"] .clear_btn').click({ multiple: true });
            cy.get('[data-cy="TodoDone"]:first').contains('пусто');
            cy.get('[data-cy="TodoDone"]:last').contains('пусто');
        })

        it('Возврат на предыдущую вкладку', () => {
            cy.go('back').get('.works');
        })
    })
})