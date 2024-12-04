const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');


function loadElement() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todoList.innerHTML = '';
    todos.forEach(todo => {
        createElement(todo.text, todo.id);
    });
}

function addElement() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const newElement = {
            text: todoText,
            id: Date.now().toString()
        };
        
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(newElement);
        localStorage.setItem('todos', JSON.stringify(todos));
        
        createElement(newElement.text, newElement.id);
        todoInput.value = '';
    }
}

function createElement(todoText, todoId) {
    const li = document.createElement('li');
    li.setAttribute('data-id', todoId);
    
    const span = document.createElement('span');
    span.textContent = todoText;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTodo(todoId);
    
    li.appendChild(span);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
}

function deleteTodo(todoId) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const filteredTodos = todos.filter(todo => todo.id !== todoId);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
    
    loadElement();
}

todoInput.addEventListener('keypress', function(event) {
    if (event.key == 'Enter') {
        addElement();
    }
});


loadElement();
