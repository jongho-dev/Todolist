const todoInput = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit-btn');
const todoList = document.getElementById('todo-list');
const ingList = document.getElementById('ing-list');
const doneList = document.getElementById('done-list');

let listItems = [];
let ingItems = [];
let doneItems = [];
let currentfocus;

// input으로 item 추가
submitBtn.addEventListener('click', () => {
  if (todoInput.value.trim() == '') {
    alert('할 일을 입력해주세요.');
  } else {
    const totalItems = listItems.concat(ingItems).concat(doneItems);
    const lst = totalItems.filter((item) => {
      return item.text.trim() == todoInput.value.trim();
    });

    if (lst.length > 0) {
      alert('중복되는 내용이 있습니다.');
    } else {
      createItem(todoInput.value, 'todo');
    }
  }
});

// item 관리
function deleteItem(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  const currentArea = li.parentNode;
  const itemtext = li.firstChild.innerHTML;
  currentArea.removeChild(li);
  let array = listItems;
  let storagename = 'todo';
  if (currentArea.id == 'ing-list') {
    array = ingItems;
    storagename = 'ing';
  } else if (currentArea.id == 'done-list') {
    array = doneItems;
    storagename = 'done';
  }
  const filterItems = array.filter((item) => {
    return item.text != itemtext;
  });
  array = filterItems;
  localStorage.setItem(storagename, JSON.stringify(array));
  location.reload(true);
}

function createItem(text, cate) {
  let area = todoList;
  let array = listItems;
  let storage = 'todo';
  if (cate == 'ing') {
    area = ingList;
    array = ingItems;
    storage = 'ing';
  } else if (cate == 'done') {
    area = doneList;
    array = doneItems;
    storage = 'done';
  }
  const li = document.createElement('li');
  li.draggable = true;
  const span = document.createElement('span');
  const div2 = document.createElement('div');
  const btn = document.createElement('button');
  const newId = array.length + 1;
  span.innerHTML = text;
  btn.innerHTML = 'X';
  btn.addEventListener('click', deleteItem);
  li.appendChild(span);
  li.appendChild(div2);
  div2.appendChild(btn);
  li.id = newId;
  li.addEventListener('click', () => {
    if (currentfocus != undefined) {
      currentfocus.style.border = '2px solid white';
      currentfocus.style.backgroundColor = 'white';
    }

    currentfocus = li;
    currentfocus.style.border = '2px solid blue';
    currentfocus.style.backgroundColor = 'rgb(233,242,255)';
  });

  area.appendChild(li);

  const obj = {
    text,
    id: newId,
  };
  array.push(obj);
  localStorage.setItem(storage, JSON.stringify(array));
}

// 드래그 앱 드롭 이벤트
const todoArea = document.getElementById('todo');
const ingArea = document.getElementById('ing');
const doneArea = document.getElementById('done');
let dragstart;
let dragfinish;
let startitems;
let finishitems;
let startstorage;
let finishstorage;

function Dragstart(e) {
  dragstart = e.target;
  const which = e.target.parentNode.id;
  if (which == 'todo-list') {
    startitems = listItems;
    startstorage = 'todo';
  } else if (which == 'ing-list') {
    startitems = ingItems;
    startstorage = 'ing';
  } else {
    startitems = doneItems;
    startstorage = 'done';
  }
  if (currentfocus != undefined) {
    currentfocus.style.border = '2px solid white';
    currentfocus.style.backgroundColor = 'white';
  }
  currentfocus = dragstart;
  currentfocus.style.border = '2px solid blue';
}

function Dragover(e) {
  e.preventDefault();
}

function Drop(e) {
  function changelist(startlist, finishlist, startstorage, finishstorage) {
    const moveitem = startlist.filter(function (item) {
      return item.text == dragstart.firstChild.innerHTML;
    });
    startlist = startlist.filter(function (item) {
      return item.text != dragstart.firstChild.innerHTML;
    });
    finishlist.push(moveitem[0]);
    localStorage.setItem(startstorage, JSON.stringify(startlist));
    localStorage.setItem(finishstorage, JSON.stringify(finishlist));
    location.reload(true);
  }

  dragfinish = e.target;
  const which = e.target.id;
  if (which == 'todo') {
    finishitems = listItems;
    finishstorage = 'todo';
  } else if (which == 'ing') {
    finishitems = ingItems;
    finishstorage = 'ing';
  } else {
    finishitems = doneItems;
    finishstorage = 'done';
  }

  if (
    (dragstart.parentNode.parentNode.id != dragfinish.id) &
    ['todo', 'ing', 'done'].includes(dragfinish.id)
  ) {
    changelist(startitems, finishitems, startstorage, finishstorage);
  }
}

todoArea.addEventListener('dragstart', Dragstart);
todoArea.addEventListener('dragover', Dragover);
todoArea.addEventListener('drop', Drop);

ingArea.addEventListener('dragstart', Dragstart);
ingArea.addEventListener('dragover', Dragover);
ingArea.addEventListener('drop', Drop);

doneArea.addEventListener('dragstart', Dragstart);
doneArea.addEventListener('dragover', Dragover);
doneArea.addEventListener('drop', Drop);

// 초기 로딩
function load() {
  let loadedTodos = localStorage.getItem('todo');
  let loadedIngs = localStorage.getItem('ing');
  let loadedDones = localStorage.getItem('done');
  if (loadedTodos == null) {
    loadedTodos = [];
  } else {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach((item) => {
      createItem(item.text, 'todo');
    });
  }

  if ((loadedIngs == null) | (loadedIngs == '')) {
    loadedIngs = [];
  } else {
    const parsedIngs = JSON.parse(loadedIngs);
    parsedIngs.forEach((item) => {
      createItem(item.text, 'ing');
    });
  }

  if (loadedDones == null) {
    loadedDones = [];
  } else {
    const parsedDones = JSON.parse(loadedDones);
    parsedDones.forEach((item) => {
      createItem(item.text, 'done');
    });
  }
}

load();
