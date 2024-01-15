const todoInput = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit-btn');
const todoList = document.getElementById('todo-list');
const ingList = document.getElementById('ing-list');
const doneList = document.getElementById('done-list');

let listItems = [];
let ingItems = [];
let doneItems = [];

// input으로 item 추가
submitBtn.addEventListener('click', () => {
  if (todoInput.value.trim() == '') {
    alert('할 일을 입력해주세요.');
  } else {
    const lst = listItems.filter((item) => {
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
  area.appendChild(li);

  const obj = {
    text,
    id: newId,
  };
  array.push(obj);
  localStorage.setItem(storage, JSON.stringify(array));
}

// 드래그 앱 드롭 이벤트
// const todoArea = document.getElementById('todo');
// const ingArea = document.getElementById('ing');
// const doneArea = document.getElementById('done');
// let startarea;
// let lastarea;
// let startItems;
// let targetItems;

// function dragStart(e) {
//   startarea = e.target;
//   if (startarea.id == 'todo') {
//     startItems = listItems;
//     targetItems = listItems;
//   } else if (startarea.id == 'ing') {
//     startItems = ingItems;
//     targetItems = ingItems;
//   } else if (startarea.id == 'done') {
//     startItems = doneItems;
//     targetItems = doneItems;
//   }
// }

// function dragOver(e) {
//   e.preventDefault();
//   lastarea = e.target;
//   console.log(lastarea.id);
//   if (lastarea.id == 'todo') {
//     targetItems = listItems;
//   } else if (lastarea.id == 'ing') {
//     targetItems = ingItems;
//   } else if (lastarea.id == 'done') {
//     targetItems = doneItems;
//   }
// }

// function Drop(e) {
//   filterItem = startItems.filter((data) => {
//     return data['id'] == startarea.id;
//   });
//   targetItems.push(filterItem[0]);
//   localStorage.setItem('ing', JSON.stringify(ingItems));

//   listItems = listItems.filter((data) => {
//     return data['id'] != currentdrag.id;
//   });
//   localStorage.setItem('todo', JSON.stringify(listItems));

//   location.reload(true);
// }

// todoArea.addEventListener('dragstart', dragStart);
// ingArea.addEventListener('dragstart', dragStart);
// doneArea.addEventListener('dragstart', dragStart);

// todoArea.addEventListener('dragover', dragOver);
// ingArea.addEventListener('dragover', dragOver);
// doneArea.addEventListener('dragover', dragOver);

// todoArea.addEventListener('drop', Drop);
// ingArea.addEventListener('drop', Drop);
// doneArea.addEventListener('drop', Drop);

// 초기 로딩
function load() {
  // todoList.replaceChildren();
  // ingList.replaceChildren();
  // doneList.replaceChildren();
  let loadedTodos = localStorage.getItem('todo');
  let loadedIngs = localStorage.getItem('ing');
  let loadedDones = localStorage.getItem('done');
  console.log(loadedIngs);
  console.log(loadedIngs);
  console.log(loadedDones);
  if (loadedTodos == null) {
    loadedTodos = [];
  } else {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach((item) => {
      createItem(item.text, 'todo');
    });
  }

  if (loadedIngs == null) {
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
