document.addEventListener('DOMContentLoaded', () => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    loadItems(items);
});



const minusBtn = document.getElementById("minusBtn");
const itemCount = document.getElementById("item-count");
const plusBtn = document.getElementById("plusBtn");


minusBtn.addEventListener('click', (e) => {
    let count = parseInt(itemCount.textContent);
    if (count > 1) {

        count--;
        itemCount.textContent = count;
    }

});

plusBtn.addEventListener('click', (e) => {
    let count = parseInt(itemCount.textContent);
    count++;
    itemCount.textContent = count;
})


itemsForm = document.getElementById('addItemForm');
itemsForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const items = JSON.parse(localStorage.getItem('items')) || [];
    const itemNameInput = document.getElementById('itemName');
    const priceInput = document.getElementById('price');
    const itemName = itemNameInput.value.trim();
    const price = priceInput.value.trim();

    if(!itemName|| !price  ) return;

    const quantity = document.getElementById('item-count').textContent;
    const total = parseInt(quantity) * parseFloat(price);
    
    const id = Date.now() + Math.random().toString(36).substring(2,9);
    
    items.push({id,itemName, price, quantity, total});
    localStorage.setItem('items', JSON.stringify(items));
   
    itemNameInput.innerHTML = '';
    priceInput.innerHTML = '';
    quantity.textContent = 1;

    loadItems(items);



});



function loadItems(items){
    tableBody = document.getElementById('itemsTableBody');
    tableBody.innerHTML='';

    items.forEach(item => {
        const row =  `<tr>
        <td>${item.itemName}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${item.total}</td>
        <td>
            <button type="button" class="btn btn-danger btn-sm" onclick="removeItem('${item.id}')">
                <i class="fa-solid fa-trash"></i>
          </button>
        </td>

        </tr>`;


        tableBody.innerHTML+=row;
    });
    updateCartSummary(items);
}


function removeItem(id){
    items = JSON.parse(localStorage.getItem('items')) || [];
    items = items.filter(item=>item.id != id);

    localStorage.setItem('items' , JSON.stringify(items));
    loadItems(items);

}

function updateCartSummary(items){
    const totalPrice = document.getElementById('fillTotalPrice');
    const countItems = document.getElementById('fillCountItems');
    let total = 0;
    let count = 0;
    items.forEach(item =>{
        total += parseFloat(item.price);
        count++;
    });

    totalPrice.textContent = total;
    countItems.textContent = count

    
}