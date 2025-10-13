document.addEventListener('DOMContentLoaded', () => {
    const tasks2 = JSON.parse(localStorage.getItem('tasks2')) || [];
    loadTasks(tasks2);

    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskDescription = document.getElementById('taskDescription');
        const task = taskDescription.value.trim();

        if (!task) return;
        const date = document.getElementById('taskDate').value;

        const priority = document.getElementById('taskPriority').value;

        const tasks2 = JSON.parse(localStorage.getItem('tasks2')) || [];
        tasks2.push({ id: Date.now(), task, date, status: 'pending', priority });

        localStorage.setItem('tasks2', JSON.stringify(tasks2));

        taskDescription.value = '';
        date.value = '';

        loadTasks(tasks2);


    });





    const sortByProiertyBtn  = document.getElementById('sortProiertyBtn');
    sortByProiertyBtn.addEventListener('click', ()=>{
        sortByProierty();
    })
});






function loadTasks(tasks) {
    const tasksContainer = document.getElementById('tasks-list');
    tasksContainer.innerHTML = '';

    tasks.forEach(t => {
        const li = document.createElement('li');
        li.className = 'd-flex justidy-content-between align-items-end py-2';

        li.innerHTML = `
        <div class="me-3 d-flex flex-column">
        <div class="d-flex align-items-center gap-2 mb-1">
            <span class="badge 
            ${t.priority === 'High' ? 'bg-danger' : t.priority === 'Medium' ? 'bg-warning text-dark' : 'bg-success'}">
            ${t.priority}
            </span>
            </div>
            <strong>${t.task}</strong>
        <small class="text-muted">Due: ${t.date}</small>
        </div>


        <div class="">
        <button class="btn btn-sm ${t.status === 'completed' ? 'btn-success text-decoration-line-through' : 'btn-outline-success'} me-2" onclick="toggleTask('${t.id}')">
            <i class="fa-solid fa-check"></i>
        </button>

        <button class="btn btn-sm btn-outline-danger" onclick="deleteTask('${t.id}')"> 
            <i class="fa-solid fa-trash"></i>
        </button>
        </div>

        `;

        tasksContainer.appendChild(li);

    });
}


function toggleTask(id) {
    const tasks2 = JSON.parse(localStorage.getItem('tasks2')) || [];
    const updatedTasks = tasks2.map(t => t.id == id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t); //returns all the tasks but makes some condition to it or return it as is
    localStorage.setItem('tasks2', JSON.stringify(updatedTasks));
    loadTasks(updatedTasks);
}

function deleteTask(id) {
    const tasks2 = JSON.parse(localStorage.getItem('tasks2')) || [];
    filteredTasks = tasks2.filter(t => t.id != id);
    localStorage.setItem('tasks2', JSON.stringify(filteredTasks));
    loadTasks(filteredTasks);
}

function sortByProierty(){

    const tasks2 = JSON.parse(localStorage.getItem('tasks2')) || [];
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };


    sorted = tasks2.sort((a,b) => {
        if(priorityOrder[ a.priority] !==  priorityOrder[b.priority]){
            return priorityOrder[ a.priority] -  priorityOrder[b.priority]
        }

        return new Date(a.date) - new Date(b.date);

    });

    loadTasks(sorted);


}


