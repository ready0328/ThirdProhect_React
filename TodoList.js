import React from 'react';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
