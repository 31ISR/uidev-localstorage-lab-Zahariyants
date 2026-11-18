const STORAGE_KEY = 'todos';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const counter = document.getElementById('counter');
const clearBtn = document.getElementById('clear-btn');

let todos = [];

function loadTodos() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            todos = []
            return;
        }
        const parsed = JSON.parse(raw)
        todos = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Не удалось прочитать задачи из localStorage:', error)
        todos = [];
    }
}

function SaveTodos() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (error) {
        console.error('Не удалось записать в localStorage:', error);
    }
}

function render() {
    list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo" + (todo.done ? " todo--done" : "");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo__checkbox";
    checkbox.checked = todo.done;

    const text = document.createElement("span");
    text.className = "todo__text";
    text.textContent = todo.text; 

    const del = document.createElement("button");
    del.type = "button";
    del.className = "todo__delete";
    del.textContent = "✕";
    del.setAttribute("aria-label", "Удалить задачу");
    
    li.append(checkbox, text, del);
    list.append(li);
  });
}

