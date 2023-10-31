import { useContext } from "react";
import { TodoContext } from "./App";

export function TodoItem({
  id,
  name,
  completed,
  // toggleTodo,
  // deleteTodo,
  // updateTodo,
}) {
  const { toggleTodo, deleteTodo } = useContext(TodoContext);

  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          checked={completed}
          type="checkbox"
          data-list-item-checkbox
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <span data-list-item-text>{name}</span>
      </label>
      <button onClick={() => deleteTodo(id)} data-button-delete>
        Delete
      </button>
      {/* <button onClick={() => updateTodo(id)} data-button-edit>
        Edit
      </button> */}
    </li>
  );
}
