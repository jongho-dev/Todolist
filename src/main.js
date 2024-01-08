const todoInput = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit-btn');

const lst1 = document.querySelector('.lst1');
const keys = Object.keys(window.localStorage);
console.log(keys);
console.log(keys.includes('todo'));
if (keys.includes('todo')) {
  const getdata = localStorage.getItem('todo');
  lst1.innerHTML = getdata;
} else {
  const getdata = [];
  localStorage.setItem('todo', getdata);
}
submitBtn.addEventListener('click', () => {
  console.log('click');
  if (todoInput.value.trim() == '') {
    alert('할 일을 입력해주세요.');
  } else {
    getdata.append(todoInput.value);
    localStorage.setItem('todo', getdata);
  }
});

localStorage.clear();
