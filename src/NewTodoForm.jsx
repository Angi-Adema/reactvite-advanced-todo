import { useContext, useRef } from "react";
import { TodoContext } from "./App";

export function NewTodoForm() {
  // addNewTodo is no longer being passed through props since we are using context.
  const nameRef = useRef();
  const { addNewTodo } = useContext(TodoContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (nameRef.current.value === "") return;

    // We now need to call a function to add the new todo.
    addNewTodo(nameRef.current.value);

    nameRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input
        autoFocus
        type="text"
        id="todo-input"
        ref={nameRef}

        // No longer need these since we are using refs here.
        // value={newTodoName}
        // onChange={(e) => setNewTodoName(e.target.value)}
      />
      <button>Add Todo</button>
    </form>
  );
}
