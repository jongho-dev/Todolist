const todoInput = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', () => {
  console.log('click');
  if (todoInput.value.trim() == '') {
    alert('할 일을 입력해주세요.');
  } else {
    localStorage.setItem('todo', todoInput.value);
  }
});

const getdata = localStorage.getItem('todo');

const lst1 = document.querySelector('.lst1');
lst1.innerHTML = getdata;
