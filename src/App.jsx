import { useState, useEffect } from "react";
import "./styles.css";
import { TodoItem } from "./TodoItem";

const localStorageKey = "TODOS";

const actions = {
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  DELETE_TODO: "DELETE_TODO",
};

function reducer(todos, { type, payload }) {
  switch (type) {
    case actions.ADD_TODO:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
  return state;
}

function App() {
  // This state makes sense to stay here locally as it is entirely separate from the todos.
  const [newTodoName, setNewTodoName] = useState("");

  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const itemValue = localStorage.getItem(localStorageKey);
    if (itemValue == null) return initialValue;

    return JSON.parse(itemValue);
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }, [todos]);

  function addNewTodo() {
    if (newTodoName === "") return;

    dispatch({ type: actions.ADD_TODO, payload: { name: newTodoName } });

    // setTodos((currentTodos) => {
    //   return [
    //     ...currentTodos,
    //     { name: newTodoName, completed: false, id: crypto.randomUUID() },
    //   ];
    // });
    setNewTodoName("");
  }

  function toggleTodo(todoId, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === todoId) return { ...todo, completed };

        return todo;
      });
    });
  }

  function deleteTodo(todoId) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== todoId);
    });
  }

  return (
    <>
      <ul id="list">
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
      </ul>

      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input
          type="text"
          id="todo-input"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <button onClick={addNewTodo}>Add Todo</button>
      </div>
    </>
  );
}

export default App;
