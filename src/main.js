const todoInput = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit-btn');
const todoList = document.getElementById('todo-list');

let listItems = [];

submitBtn.addEventListener('click', () => {
  paintTodo(todoInput.value);
});

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const filterItems = listItems.filter((toDo) => {
    return toDo.id != parseInt(li.id);
  });
  listItems = filterItems;
  localStorage.setItem('todo', JSON.stringify(listItems));
}

function paintTodo(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const btn = document.createElement('button');
  const newId = listItems.length + 1;
  span.innerHTML = text;
  btn.innerHTML = 'X';
  btn.addEventListener('click', deleteTodo);
  li.appendChild(span);
  li.appendChild(btn);
  li.id = newId;
  todoList.appendChild(li);

  const obj = {
    text,
    id: newId,
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
