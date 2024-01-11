const todoInput = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit-btn');
const todoList = document.getElementById('todo-list');

let listItems = [];

function saveItems() {
  const obj = {
    title: todoInput.value,
  };
  const json = JSON.stringify(obj);
  console.log(json);
  items.push(json);
  console.log(items);
  localStorage.setItem('todo', items);
}

submitBtn.addEventListener('click', () => {
  paintTodo(todoInput.value);
});

function paintTodo(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const btn = document.createElement('button');
  span.innerHTML = text;
  btn.innerHTML = 'X';
  li.appendChild(span);
  li.appendChild(btn);
  todoList.appendChild(li);

  const obj = {
    text,
  };
  listItems.push(obj);
  localStorage.setItem('todo', JSON.stringify(listItems));
}

function load() {
  const loadedTodos = localStorage.getItem('todo');
  if (loadedTodos != null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach((toDo) => {
      paintTodo(toDo.text);
    });
  }
}

load();
