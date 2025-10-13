const form = document.querySelector('.form');
const descriptionTinput = document.getElementById('expense-description');
const amoutInput = document.getElementById('expense-amount');
const categoryselect = document.querySelector('.form-select');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const description = descriptionTinput.value.trim();
    const amount = amoutInput.value;
    const category = categoryselect.value;

    if (!description || !amount || category === "" || category === null) {
        alert("Please fill out all fields!");
        return;

    }

    tr = document.createElement('tr');
    td1 = document.createElement('td');
    td1.textContent = description;
    td2 = document.createElement('td');
    td2.textContent = amount + " $";
    td3 = document.createElement('td');

    switch (category) {
        case "food":
            td3.innerHTML = `<span class="badge bg-success px-3 py-2">${category}</span>`;
            break;
        case "transport":
            td3.innerHTML = `<span class="badge bg-info text-white px-3 py-2">${category}</span>`;
            break;
        case "entertainment":
            td3.innerHTML = `<span class="badge bg-secondary text-white px-3 py-2">${category}</span>`;
            break;
        case "bills":
            td3.innerHTML = `<span class="badge bg-danger text-light px-3 py-2">${category}</span>`;
            break;
        default:
            td3.innerHTML = `<span class="badge bg-warning px-3 py-2">${category}</span>`;
    }





    tbody = document.querySelector('tbody');

    tr.append(td1, td2, td3);
    tbody.append(tr);
    tr.classList.add('new-expense');
    
    const rows = document.querySelectorAll('tbody tr');

    let total = 0;
    rows.forEach(row => {
        total += Number(row.cells[1].textContent.replace(" $", ""));
    })

    const totalAmountData = document.querySelector('.total-amount');
    totalAmountData.textContent = total + " $";


})


const filterCategorySelect = document.querySelector('.filter-category-select');
filterCategorySelect.addEventListener('change', function () {
    const category = this.value;
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const rowCategory = row.cells[2].textContent;
        if (category === 'all' || rowCategory === category) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

});


document.body.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.classList.add('trail');
    dot.style.left = e.pageX + 'px';
    dot.style.top = e.pageY + 'px';
    document.body.append(dot);

    // fade out and remove after a short time
    setTimeout(() => {
        dot.style.opacity = 0;
        setTimeout(() => dot.remove(), 300); // t = 50 + 300remove from DOM so it doesnot clutter the page
    }, 50); //when t = 50ms make the dot invisible
});
