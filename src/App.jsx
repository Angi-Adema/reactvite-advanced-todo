import { useEffect, useReducer, createContext } from "react";
import "./styles.css";
// import { TodoItem } from "./TodoItem";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

const localStorageKey = "TODOS";

const actions = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  DELETE_TODO: "DELETE_TODO",
};

function reducer(todos, { type, payload }) {
  switch (type) {
    case actions.ADD_TODO:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];
    case actions.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, completed: payload.completed };
        }

        return todo;
      });
    case actions.DELETE_TODO:
      return todos.filter((todo) => {
        if (todo.id !== payload.id) return { ...todo };
      });
    // case actions.UPDATE_TODO:
    //   return todos.map((todo) => {
    //     if (todo.id === payload.id) return { ...todo, name: payload.name };

    //     return todo;
    //   });
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

export const TodoContext = createContext();

function App() {
  // This state makes sense to stay here locally as it is entirely separate from the todos.
  // Since this state is only used in addNewTodo, it makes sense to get rid of it and use refs instead. (See in NewTodoForm.jsx)
  // const [newTodoName, setNewTodoName] = useState("");

  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const itemValue = localStorage.getItem(localStorageKey);
    if (itemValue == null) return initialValue;

    return JSON.parse(itemValue);
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(name) {
    // if (newTodoName === "") return;  (See inside NewTodoForm.jsx)

    dispatch({ type: actions.ADD_TODO, payload: { name } });

    // setTodos((currentTodos) => {
    //   return [
    //     ...currentTodos,
    //     { name: newTodoName, completed: false, id: crypto.randomUUID() },
    //   ];
    // });

    // We remove this and reset our name value in NewToddoForm.jsx in the handleSubmit where it will reset the name once we type into it.
    // setNewTodoName("");
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: actions.TOGGLE_TODO, payload: { id: todoId, completed } });

    // setTodos((currentTodos) => {
    //   return currentTodos.map((todo) => {
    //     if (todo.id === todoId) return { ...todo, completed };

    //     return todo;
    //   });
    // });
  }

  function deleteTodo(todoId) {
    dispatch({ type: actions.DELETE_TODO, payload: { id: todoId } });

    // setTodos((currentTodos) => {
    //   return currentTodos.filter((todo) => todo.id !== todoId);
    // });
  }

  // function updateTodo(todoId, name) {
  //   dispatch({ type: actions.UPDATE_TODO, payload: { id: todoId, name } });

  // setTodos((currentTodos) => {
  //   return currentTodos.map((todo) => {
  //     if (todo.id === todoId) return { ...todo, name };

  //     return todo;
  //   });
  // });
  // }

  return (
    <>
      <TodoContext.Provider
        value={{
          todos,
          addNewTodo,
          toggleTodo,
          deleteTodo,
        }}
      >
        {/* Moved this into its own component in NewTodoForm.jsx */}
        {/* <ul id="list">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul> */}
        {/* Moved this into its own component in TodoList.jsx */}
        {/* <div id="new-todo-form">
          <label htmlFor="todo-input">New Todo</label>
          <input
            type="text"
            id="todo-input"
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
          />
          <button onClick={addNewTodo}>Add Todo</button>
        </div> */}
        <TodoList />
        <NewTodoForm /> {/* Removed addNewTodo={addNewTodo} */}
      </TodoContext.Provider>
    </>
  );
}

export default App;
