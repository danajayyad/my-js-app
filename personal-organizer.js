document.addEventListener('DOMContentLoaded', () => {
    const defaultButton = document.querySelector(".tasks-btn");
    showSection('tasks', defaultButton);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    loadTasks(tasks);

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    loadNotes(notes);

    const events = JSON.parse(localStorage.getItem('events')) || [];
    loadEvents(events); 

});



function showSection(sectionId, btn) {
    const sections = document.querySelectorAll(".main-section")
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = "block";
    
    
     const bar = document.querySelector('.bar');

     
    bar.classList.remove('yellow-bg', 'bg', 'green-bg'); 
    if (sectionId === 'notes') {
        bar.classList.add('yellow-bg');
    } else if (sectionId === 'tasks') {
        bar.classList.add('bg');
    } else if (sectionId === 'events') {
        bar.classList.add('green-bg');
    }

    document.querySelectorAll(".aside-button").forEach(button => button.classList.remove("active"));
    btn.classList.add("active");
}


document.querySelector(".task-form").addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('task-input');
    const task = input.value.trim();
    input.value = '';

    if (!task) return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: task, done: false });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks(tasks);

});

function loadTasks(tasks) {
    const list = document.getElementById('tasks-list');
    list.innerHTML = '';

    tasks.forEach((task, index) => {

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between border-bg ';



        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.done) span.style.textDecoration = 'line-through';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-3';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => {
            task.done = checkbox.checked;
            span.style.textDecoration = task.done ? 'line-through' : 'none';
            updateTask(index, task);

        });

        const deletebtn = document.createElement('button');
        deletebtn.className = 'btn btn-sm  rounded-pill';
        const deleteIcon = document.createElement('icon');
        deleteIcon.className = ' fa fa-times text-danger';
        deletebtn.appendChild(deleteIcon);
        deletebtn.addEventListener('click', () => deleteTask(index));


        const taskContent = document.createElement('div');
        taskContent.className = 'd-flex align-items-center';
        taskContent.appendChild(checkbox);
        taskContent.appendChild(span);

        li.appendChild(taskContent);
        li.appendChild(deletebtn);
        list.appendChild(li);




    });

}

function updateTask(index, updatedTask) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index] = updatedTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function deleteTask(index) {
    const isConfirmed = confirm("Are you sure you want to delete this task?");
    if (!isConfirmed) return;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks(tasks);
}



notesForm = document.getElementById("notes-form");
notesForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const note = document.getElementById('note-input');
    noteText = note.value.trim();
    if (!noteText) return;

    note.value = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));


    loadNotes(notes);

});


function loadNotes(notes) {

    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML ='';

    notes.forEach( (note, index) => {
        const col  = document.createElement('div');
        col.className = 'col-md-4 mt-5';

        const card = document.createElement('div');
        card.className = 'card shadow-sm border-0 note-card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const p = document.createElement('p');
        p.className = 'card-text fw-bold';
        p.textContent = note;

        const date = new Date().toLocaleDateString();
        const dateText = document.createElement('p');
        dateText.className = 'text-muted small mb-2';
        dateText.textContent = date;

        deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-sm float-end text-danger';
        deleteButton.innerHTML = '<i class= "fa fa-solid fa-trash"></i>';
        deleteButton.addEventListener('click', ()=>deleteNote(index));

        cardBody.appendChild(dateText);
        cardBody.appendChild(p);
        cardBody.appendChild(deleteButton);
        card.appendChild(cardBody);
        col.appendChild(card);
        notesContainer.appendChild(col);


    });




}


function deleteNote(index){
    notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes(notes);


}




eventForm = document.getElementById("event-form");
eventForm.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const date = document.getElementById('event-date').value;
    const event = document.getElementById('event-title');
    eventText = event.value.trim();
    if(!eventText || !date) return;
    
    
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push({eventText, date}); // { eventText: eventText, date: date }
    
    date.value = '';
    event.value = '';

    localStorage.setItem('events', JSON.stringify(events));



    loadEvents(events);

});





function loadEvents(events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';

    const today = new Date();
    const endThisWeek = new Date();
    endThisWeek.setDate(today.getDate() + 7);

    events.sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach((event) => {

        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';

        const card = document.createElement('div');
        card.className = 'card shadow-sm border-0';

        const eventDate = new Date(event.date);
        if (eventDate < today) {
            card.classList.add('bg-light', 'text-muted');
        } else if (eventDate <= endThisWeek) {
            card.classList.add('bg-light-success','fw-bold', 'bg-opacity-10');
        } else {
            card.classList.add('bg-light-warning', 'bg-opacity-10');
        }

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex flex-column';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = event.eventText;

        const dateText = document.createElement('p');
        dateText.className = 'card-text text-muted small';
        dateText.textContent = new Date(event.date).toLocaleDateString();

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger mt-2 align-self-end';
        deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
        deleteBtn.addEventListener('click', () => deleteEvent(event.eventText, event.date));

        cardBody.appendChild(title);
        cardBody.appendChild(dateText);
        cardBody.appendChild(deleteBtn);
        card.appendChild(cardBody);
        col.appendChild(card);
        eventList.appendChild(col);
    });
}


function deleteEvent(eventText , date){
    events = JSON.parse(localStorage.getItem('events')) || [];
    // filtering,keepig in list only that matches the case, intsead of removing from list with index "splice"
    events = events.filter(e => e.date !== date || e.eventText !== eventText);
    localStorage.setItem('events' , JSON.stringify(events));
    loadEvents(events);
    

}
