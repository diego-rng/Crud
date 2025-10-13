import React from "react"
import { GlobalStyles } from "@ui/theme/GlobalStyles.tsx";
import { todo } from "node:test";
import type { Todo } from "@db-crud-todo";
import { todoController } from "@ui/controller/todo.ts";

const bg = "https://mariosouto.com/cursos/crudcomqualidade/bg";

interface HomeTodo{
    id: string;
    content: string;

}

    function HomePage() {
    const initialLoadComplete = React.useRef(false);
    const [newTodoContent, setNewTodoContent] = React.useState("");
    const [totalPages, setTotalPages] = React.useState(0);
    const [page, setPage] = React.useState(1); 
    const [search, setSearch] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const [todos, setTodos] = React.useState<HomeTodo[]>([]);    /* console.log(totalPages) */
    const homeTodos = todoController.filterTodosByContent<HomeTodo>(search, todos);
    
    const hasMorePages = totalPages > page;
    const hasNoTodos = homeTodos.length === 0 && !isLoading;

    // Load basic info on page launch
    React.useEffect(() => {
        if (!initialLoadComplete.current) {
            todoController.get({ page }).then(({ todos, pages }) => {
                setTodos(todos);
                setTotalPages(pages);
            })
            .finally(() => {
                setIsLoading(false);
                initialLoadComplete.current = true;
            });
        }
        }, []);
    
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
        <form onSubmit= {(event) => {
            event.preventDefault();
            todoController.create({
                content: newTodoContent,
                onSuccess(todo: HomeTodo) {
                    setTodos((oldTodos) => {
                        return[
                            todo, 
                            ...oldTodos
                        ]
                    });
                    setNewTodoContent("");
                },
                onError() {
                    alert("You need to provide content to create a TODO.")
                }
                });
        }}>
          <input
            type="text"
            placeholder="Correr, Estudar..."
            value={newTodoContent}
            onChange={function newTodoHandler(event) {
                setNewTodoContent(event.target.value);
            }}
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
            onChange={() => {
                console.log("Change!")
            }}
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
             

              {isLoading && ( <tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  Carregando...
                </td>
              </tr>)}

              {hasNoTodos && (<tr>
                <td colSpan={4} align="center">
                  Nenhum item encontrado
                </td>
              </tr>) }

              {hasMorePages && (<tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  <button
                    data-type="load-more" onClick={() => {
                        setIsLoading(true);
                        const nextPage = page + 1;
                        setPage(nextPage);
                        
                         todoController.get({ page : nextPage }).then(({ todos, pages }) => {
                            setTodos((oldTodos) => {
                                return [...oldTodos, ...todos]
                            });
                            setTotalPages(pages);
                         })
                         .finally(() => {
                            setIsLoading(false);
                         });
                    }}
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
              </tr>)}

          </tbody>
        </table>
      </section>
    </main>
)
}

export default HomePage
