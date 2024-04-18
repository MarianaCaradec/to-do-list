// DATE
const dateNumber = document.getElementById('date-number');
const dateMonth = document.getElementById('date-month');
const dateYear = document.getElementById('date-year');
const dateDay = document.getElementById('date-day');

// TASKS CONTAINER
const tasksContainer = document.getElementById('tasks-container');

const setDate = function() {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', {day: 'numeric'});
    dateMonth.textContent = date.toLocaleString('es', {month: 'short'});
    dateYear.textContent = date.toLocaleString('es', {year: 'numeric'});
    dateDay.textContent = date.toLocaleString('es', {weekday: 'long'});
}

const addNewTask = function(event) {
    event.preventDefault(); // para evitar que al dar submit nos lleve a otra pag
    const {value} = event.target.taskText;
    if(!value) return; // si no hay value el return corta la ejecucion de la funcion addNewTask para evitar que se agreguen tareas vacias
    const task = document.createElement('div');
    task.classList.add('task', 'round-border');
    task.textContent = value; // se le agrega el contenido de la tarea que escribio el usuario
    tasksContainer.prepend(task); // prepend para agregar cada nueva tarea al principio de todo
    event.target.reset(); // se limpia el input del form para que quede vacio y se pueda agregar otra tarea luego
    task.addEventListener('click', changeTaskState);
}

const changeTaskState = event => {
    event.target.classList.toggle('done');
    // toggle para agregar la class done si el elemento no la tiene, o sacarla si el elemento la tiene
}

const order = () => {
    const toDo = [];
    const done = [];
    tasksContainer.childNodes.forEach( element => {
        element.classList.contains('done') ? done.push(element) : toDo.push(element); 
        // si el elemento contiene en su clase done, agregarlo al array de done, si no agregarlo al array de toDo | push agrega el elemento al final del array
    })
    return[...toDo, ...done];
    // se ordena el array por: todo lo que esta por hacerse y luego lo que ya se hizo
}

const renderOrdererTasks = () => {
    order().forEach(element => tasksContainer.appendChild(element));
}
setDate();