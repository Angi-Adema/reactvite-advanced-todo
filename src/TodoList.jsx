import { useContext } from "react";
import { TodoContext } from "./App";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { todos } = useContext(TodoContext);

  return (
    <ul id="list">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            {...todo}

            // These are being moved into TodoItem.jsx.
            // toggleTodo={toggleTodo}
            // deleteTodo={deleteTodo}
            // updateTodo={updateTodo}
          />
        );
      })}
    </ul>
  );
}
