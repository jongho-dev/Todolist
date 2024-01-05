const todoInput = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', () => {
  console.log('click');
  localStorage.setItem('title', todoInput.value);
});

const getdata = localStorage.getItem('title');
const lst1 = document.querySelector('.lst1');
lst1.innerHTML = getdata;
