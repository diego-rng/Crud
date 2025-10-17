import { v4 as uuid } from "uuid";

const BASE_URL = "http://localhost:3000"

describe("/ - Todo Feed", () => {
    it("When loaded, renders the page", () => {
        cy.visit(BASE_URL);
    });
    it.only("When creating a new Todo, it should appear on the screen", () => {
        // 0 - Intercepting
        cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
            request.reply({
                statusCode: 201, 
                body:{todo: {
                    id: uuid(),
                    date: new Date,
                    content: "Test Todo",
                    done: false,
                }
                },
            });
        }).as('createTodo');
        // 1 - Open page
        cy.visit(BASE_URL);
        // 2 - Select Todo Input and 3 - Type in a new "Test input"
        const inputAddTodo = "input[nameadd-todo']";
        cy.get(inputAddTodo).type("Test Todo");
        // 4 - Click the "+" button
        const buttonAddTodo = "[aria-label='Adicionar novo item']";
        cy.get(buttonAddTodo).click();

        // 5 - Check if a new element has appeared in the page
        cy.get("table > tbody").contains("Test Todo");
        expect("texto").to.be.equal("texto");
    });
});
