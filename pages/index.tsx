import React from "react"
import { GlobalStyles } from "@ui/theme/GlobalStyles.tsx";
import { todo } from "node:test";
import type { Todo } from "@db-crud-todo";

const bg = "https://mariosouto.com/cursos/crudcomqualidade/bg";

const todos : Todo[] = [
    {
      id: "8f834201-3844-4c6c-b903-ab1f5316acf5",
      date: "2025-10-08T19:47:42.301Z",
      content: "First TODO",
      done: false
    },
    {
      id: "c24e21e3-fbb5-4aa8-8c8f-2f46fe2f866c",
      date: "2025-10-08T19:47:42.302Z",
      content: "Updated!",
      done: false
    }
  ];

function HomePage() {
    console.log("todos", todos);

    const [page, setPage] = React.useState(1); 
    return (
    
    <main>
      <GlobalStyles themeName="red"/>
      <header
        style={{
              backgroundImage: `url('${bg}')`,
        }}
        >
        <div className="typewriter">
          <h1>O que fazer hoje?</h1>
        </div>
        <form>
          <input
            type="text"
            placeholder="Correr, Estudar..."
            />
          <button
            type="submit"
            aria-label="Adicionar novo item"
          >
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input
            type="text"
            placeholder="Filtrar lista atual, ex: Dentista"
            />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Id</th>
              <th align="left">Conteúdo</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {todos.map((todo)=> {
                return (
                     <tr key={todo.id}>
                <td>
                  <input
                    type="checkbox"
                    />
                </td>
                <td>{todo.id.substring(0, 4)}</td>
                <td>
                    {todo.content}
                </td>
                <td align="right">
                  <button
                    data-type="delete"
                    >
                    Apagar
                  </button>
                </td>
              </tr>
                )
            })}
             

              <tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  Carregando...
                </td>
              </tr>

              <tr>
                <td colSpan={4} align="center">
                  Nenhum item encontrado
                </td>
              </tr>

              <tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  <button
                    data-type="load-more" onClick={() => setPage(page + 1)}
                    >
                    Página {page}, Carregar mais{" "}
                    <span
                      style={{
                          display: "inline-block",
                          marginLeft: "4px",
                          fontSize: "1.2em",
                        }}
                        >
                      ↓
                    </span>
                  </button>
                </td>
              </tr>

          </tbody>
        </table>
      </section>
    </main>
)
}

export default HomePage
