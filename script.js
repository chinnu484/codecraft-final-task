document.addEventListener('DOMContentLoaded', loadTodos);

function loadTodos() {
  fetch('/get-todos')
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('todo-list');
      list.innerHTML = '';
      data.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${todo.task}</span>
          <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        list.appendChild(li);
      });
    });
}

function addTodo() {
  const input = document.getElementById('todo-input');
  const task = input.value.trim();
  if (task === "") return;

  fetch('/add-todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: task })
  })
  .then(res => res.json())
  .then(() => {
    input.value = '';
    loadTodos();
  });
}

function deleteTodo(id) {
  fetch(`/delete-todo/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(() => loadTodos());
}
