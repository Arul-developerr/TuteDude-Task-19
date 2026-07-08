const servicesData = [
    { id: 1, name: 'Dry Cleaning', price: 200.00, image: './images/_3.jpeg' },
    { id: 2, name: 'Leather & Suede Cleaning', price: 999.00, image: './images/1.jpeg' },
    { id: 3, name: 'Ironing', price: 30.00, image: './images/2.jpeg' },
    { id: 4, name: 'Wedding Dress Cleaning', price: 2400.00, image: './images/3.jpeg' },
    { id: 5, name: 'Wash And Fold', price: 140.00, image: './images/4.jpeg' },
    { id: 6, name: 'Stain Removal', price: 500.00, image: './images/5.jpeg' }
];

let cart = [];
let currentIndex = 0; 

let serviceImg = document.getElementById('service-img');
let serviceName = document.getElementById('service-name');
let servicePrice = document.getElementById('service-price');
let skipBtn = document.getElementById('skip-btn');
let addBtn = document.getElementById('add-btn');

let emptyState = document.getElementById('empty-state');
let cartTable = document.getElementById('cart-table');
let cartBody = document.getElementById('cart-body');
let totalPriceEl = document.getElementById('total-price');

let bookBtn = document.getElementById('book-btn');
let warningText = document.getElementById('warning-text');
let bookingForm = document.getElementById('booking-form');


function saveToMemory() {
    let textData = JSON.stringify(cart); 
    localStorage.setItem('savedCart', textData);
}

function loadFromMemory() {
    let textData = localStorage.getItem('savedCart');
    
    if (textData !== null) {
        cart = JSON.parse(textData); 
    } else {
        cart = [];
    }
}


function showPicture() {
    let item = servicesData[currentIndex];
    
    serviceImg.src = item.image;
    serviceName.innerText = item.name;
    servicePrice.innerText = "₹" + item.price;
}

function goNext() {
    if (currentIndex < servicesData.length - 1) {
        currentIndex = currentIndex + 1;
    } else {
        currentIndex = 0;
    }
    showPicture();
}


function redrawCart() {
    let total = 0;
    
    for (let i = 0; i < cart.length; i = i + 1) {
        total = total + cart[i].price;
    }
    
    totalPriceEl.innerText = "₹ " + total;
    
    if (cart.length === 0) {
        emptyState.style.display = 'flex';
        cartTable.style.display = 'none';
        bookBtn.disabled = true;
        bookBtn.style.backgroundColor = '#c7d2fe'; 
        warningText.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        cartTable.style.display = 'table';
        bookBtn.disabled = false;
        bookBtn.style.backgroundColor = '#6366f1'; 
        warningText.style.display = 'none';
        
        cartBody.innerHTML = ''; 
        
        for (let i = 0; i < cart.length; i = i + 1) {
            let row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${cart[i].name}</td>
                <td style="text-align: right;">₹${cart[i].price}</td>
                <td><button onclick="removeItem(${i})" style="
                color: red; 
                cursor: pointer; 
                border: none; 
                background: none
                padding: 15px 10px;
                margin-left: 20px
                ;">Remove</button></td>
            `;
            
            cartBody.appendChild(row);
        }
    }
}


function removeItem(index) {
    cart.splice(index, 1);
    saveToMemory();
    redrawCart();
}


addBtn.addEventListener('click', function() {
    let item = servicesData[currentIndex];
    cart.push(item); 
    
    saveToMemory(); 
    redrawCart(); 
    goNext(); 
});


skipBtn.addEventListener('click', function() {
    goNext();
});


bookingForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    if (cart.length > 0) {
        alert("Success! You booked items.");
        
        cart = [];
        saveToMemory();
        redrawCart();
        bookingForm.reset();
    }
});

loadFromMemory(); 
showPicture(); 
redrawCart();