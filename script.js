let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;

let popUp;
let popUpInfo;
let todoToEdit;
let popUpInput;
let popUpAddBtn;
let popUpCloseBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMevents();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');

	popUp = document.querySelector('.popup');
	popUpInfo = document.querySelector('.popup-info');
	popUpInput = document.querySelector('.popup-input');
	popUpAddBtn = document.querySelector('.accept');
	popUpCloseBtn = document.querySelector('.cancel');
};

const prepareDOMevents = () => {
	addBtn.addEventListener('click', addNewTodo);
	ulList.addEventListener('click', checkList);
	popUpCloseBtn.addEventListener('click', closepopUp);
	popUpAddBtn.addEventListener('click', changeTodoText);
	todoInput.addEventListener('keyup', enterKeyCheck);
};

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li');
		newTodo.textContent = todoInput.value;
		toolsArea();
		ulList.append(newTodo);
		todoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = 'Wpisz treść zadania';
	}
};

const toolsArea = () => {
	const divTools = document.createElement('div');
	divTools.classList.add('tools');
	newTodo.append(divTools);

	const divToolsButtonComplete = document.createElement('button');
	divToolsButtonComplete.classList.add('complete');
	divToolsButtonComplete.innerHTML = ' <i class="fas fa-check"></i>';

	const divToolsButtonEdit = document.createElement('button');

	divToolsButtonEdit.classList.add('edit');
	divToolsButtonEdit.textContent = 'EDIT';

	const divToolsButtonDelete = document.createElement('button');
	divToolsButtonDelete.classList.add('delete');
	divToolsButtonDelete.innerHTML = '<i class="fas fa-times"></i>';

	divTools.append(
		divToolsButtonComplete,

		divToolsButtonEdit,
		divToolsButtonDelete
	);
};

const checkList = (e) => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		console.log('edit');
		editTodo(e);
	} else if (e.target.matches('.delete')) {
		deleteToDo(e);
	}
};

const editTodo = (e) => {
	todoToEdit = e.target.closest('li');
	popUpInput.value = todoToEdit.firstChild.textContent;
	console.log(todoToEdit.firstChild);
	popUp.style.display = 'flex';
};
const closepopUp = () => {
	popUp.style.display = 'none';
	popUpInfo.textContent = '';
};

const changeTodoText = () => {
	if (popUpInput.value !== '') {
		todoToEdit.firstChild.textContent = popUpInput.value;
		popUp.style.display = 'none';
		popUpInfo.textContent = '';
	} else {
		popUpInfo.textContent = 'Musisz podać jakaś treść';
	}
};

const deleteToDo = (e) => {
	e.target.closest('li').remove();

	const allTodos = ulList.querySelectorAll('li');
	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście';
	}
};

const enterKeyCheck = (e) => {
	if (e.key === 'Enter') {
		addNewTodo();
	}
};

document.addEventListener('DOMContentLoaded', main);
