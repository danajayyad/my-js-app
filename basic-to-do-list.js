document.addEventListener('DOMContentLoaded', () => {
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  loadTasks(tasks);

  const taskForm = document.getElementById('taskForm');
  taskForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const taskDescription = document.getElementById('taskDescription');
      const task = taskDescription.value.trim();
  
      if(!task) return ;
      const date = document.getElementById('taskDate').value;
  
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push({id:Date.now(), task, date, status : 'pending'});
      
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      taskDescription.value = '';
      date.value = '';
  
      loadTasks(tasks);
  
  
  });

  

const filterSelect = document.getElementById('filterStatus');
filterSelect.addEventListener('change', (e)=>{
    e.preventDefault();
    const filter = e.target.value;

    filterStatus(filter);


});

const sortByDateBtn = document.getElementById("sortByDate");
sortByDateBtn.addEventListener('click',  ()=>{
    sortByDate();

})

});






function loadTasks(tasks){
    const tasksContainer = document.getElementById('tasks-list');
    tasksContainer.innerHTML = '';
    
    tasks.forEach(t => {
        const li = document.createElement('li');
        li.className ='d-flex justidy-content-between align-items-center py-2';

        li.innerHTML = `
        <div class="me-3">
            <strong>${t.task}</strong><br>
            <small class="text-muted">${t.date}</small>
        </div>

        <div>
        <button class="btn btn-sm ${t.status === 'completed'? 'btn-success text-decoration-line-through' :'btn-outline-success' } me-2" onclick="toggleTask('${t.id}')">
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


function toggleTask(id){
    const tasks = JSON.parse(localStorage.getItem('tasks') ) || [];
    const updatedTasks = tasks.map(t =>    t.id == id     ?     { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }     : t); //returns all the tasks but makes some condition to it or return it as is
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    loadTasks(updatedTasks);
}

function deleteTask(id){
    const tasks = JSON.parse(localStorage.getItem('tasks') ) || [];
    filteredTasks = tasks.filter(t=>t.id != id);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    loadTasks(filteredTasks);
}


function filterStatus(filter){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let filteredTasks;

    if(filter === 'all'){
        filteredTasks = tasks; 
    } else {
        filteredTasks = tasks.filter(t => t.status === filter);
    }

    loadTasks(filteredTasks);
}


function sortByDate(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    sorted = tasks.sort((a,b)=> new Date(a.date) - new Date(b.date));
    loadTasks(sorted);
}