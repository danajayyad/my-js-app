document.addEventListener("DOMContentLoaded", () => {
    displayTasks();
    document.getElementById('category-filter')
            .addEventListener('change', displayTasks);
});



function populateCategoryFilter(tasks3) {
    const filter = document.getElementById('category-filter');
    const categories = [...new Set(tasks3.map(t => t.category))];
    //   Remove duplicates with Set
    // Convert back to array  [...]



    filter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        filter.appendChild(option);
    });
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');

    const task = taskInput.value.trim();
    const category = categoryInput.value.trim();
    if (!category || !task) return;

    const tasks3 = JSON.parse(localStorage.getItem('tasks3')) || [];
    tasks3.push({ task, category });
    localStorage.setItem('tasks3', JSON.stringify(tasks3));


    taskInput.value = '';
    categoryInput.value = '';


    displayTasks();

}


function displayTasks() {
    const tasks3 = JSON.parse(localStorage.getItem('tasks3')) || [];
    
    const selectedCategory = document.getElementById('category-filter').value;
    
    populateCategoryFilter(tasks3);

    // group tasks by category
    const groupedTasks = tasks3.reduce((acc, t) => {
        const cat = t.category || "Uncategorized";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(t);
        return acc;
    }, {});



    let categoriesToShow = Object.keys(groupedTasks).sort();
    if (selectedCategory !== 'all') {
        categoriesToShow = categoriesToShow.filter(cat => cat === selectedCategory);
    }

    const container = document.getElementById('tasks-container');
    container.innerHTML = '';

    categoriesToShow.forEach(cat => {
        const title = document.createElement('h4');
        title.textContent = cat.toUpperCase();
        title.className = 'mt-4 text-primary';
        container.appendChild(title);

        const table = document.createElement('table');
        table.className = "table table-bordered table-striped";

        const tbody = document.createElement("tbody");
        groupedTasks[cat].forEach(t => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${t.task}</td>`;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        container.appendChild(table);
    });
}
