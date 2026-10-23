const form = document.getElementById('todo-form');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const todoList = document.getElementById('todo-list');

const API_URL = '/api/todos';

// Fetch all todos
async function fetchTodos() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (data.success) {
      renderTodos(data.data);
    }
  } catch (err) {
    console.error('Error fetching todos:', err);
  }
}

// Render todos
function renderTodos(todos) {
  todoList.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <div class="task-info">
        <span class="task-title">${todo.title}</span>
        ${todo.description ? `<span class="task-desc">${todo.description}</span>` : ''}
      </div>
      <div class="actions">
        <button class="toggle-btn" onclick="toggleComplete('${todo._id}', ${!todo.completed})">
          ${todo.completed ? 'Undo' : 'Done'}
        </button>
        <button class="delete-btn" onclick="deleteTodo('${todo._id}')">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// Add todo
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title) return;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });

    if (res.ok) {
      titleInput.value = '';
      descInput.value = '';
      fetchTodos();
    }
  } catch (err) {
    console.error('Error adding todo:', err);
  }
});

// Toggle status
async function toggleComplete(id, completedStatus) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: completedStatus })
    });
    fetchTodos();
  } catch (err) {
    console.error('Error updating status:', err);
  }
}

// Delete todo
async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
  } catch (err) {
    console.error('Error deleting todo:', err);
  }
}

fetchTodos();

