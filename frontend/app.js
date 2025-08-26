const API_URL = "http://localhost:5000/api/todos";

async function fetchTodos() {
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();

    const list = document.getElementById("todoList");
    list.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">
          ${todo.task}
        </span>
        <div style="display:inline; margin-left:10px;">
          <button onclick="toggleComplete('${todo._id}', ${!todo.completed})">✓</button>
          <button onclick="deleteTodo('${todo._id}')">✗</button>
        </div>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching todos:", err);
  }
}

async function addTodo() {
  const task = document.getElementById("todoInput").value;
  if (!task) return;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task })
  });



  document.getElementById("todoInput").value = '';
  fetchTodos();
}


document.getElementById('todoInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  fetchTodos();
}

async function toggleComplete(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed })
  });
  fetchTodos();
}

window.onload = fetchTodos;
