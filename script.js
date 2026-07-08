const servicesData = [
    { id: 1, name: 'Dry Cleaning', price: 200.00, image: './images/_3.jpeg' },
    { id: 2, name: 'Leather & Suede Cleaning', price: 999.00, image: './images/1.jpeg' },
    { id: 3, name: 'Ironing', price: 30.00, image: './images/2.jpeg' },
    { id: 4, name: 'Wedding Dress Cleaning', price: 2400.00, image: './images/3.jpeg' },
    { id: 5, name: 'Wash And Fold', price: 140.00, image: './images/4.jpeg' },
    { id: 6, name: 'Stain Removal', price: 500.00, image: './images/5.jpeg' }
];

let cart = [];
let currentServiceIndex = 0;

const serviceImg = document.getElementById('service-img');
const serviceName = document.getElementById('service-name');
const servicePrice = document.getElementById('service-price');
const skipBtn = document.getElementById('skip-btn');
const addBtn = document.getElementById('add-btn');

const emptyState = document.getElementById('empty-state');
const cartTable = document.getElementById('cart-table');
const cartBody = document.getElementById('cart-body');
const totalPriceEl = document.getElementById('total-price');

const bookBtn = document.getElementById('book-btn');
const warningText = document.getElementById('warning-text');
const bookingForm = document.getElementById('booking-form');


function renderCurrentService() {
    const service = servicesData[currentServiceIndex];
    serviceImg.src = service.image;
    serviceName.textContent = service.name;
    servicePrice.textContent = `₹${service.price.toFixed(2)}`;
}

function nextService() {
    if (currentServiceIndex < servicesData.length - 1) {
        currentServiceIndex++;
    } else {
        currentServiceIndex = 0; 
    }
    renderCurrentService();
}

function updateCartUI() {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceEl.textContent = `₹ ${totalAmount.toFixed(2)}`;

    if (cart.length === 0) {
        emptyState.style.display = 'flex';
        cartTable.style.display = 'none';
        
        bookBtn.classList.add('disabled');
        bookBtn.disabled = true;
        warningText.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
        cartTable.style.display = 'table';
        
        bookBtn.classList.remove('disabled');
        bookBtn.disabled = false;
        warningText.style.display = 'none';

        cartBody.innerHTML = '';
        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td class="text-right">₹${item.price.toFixed(2)}</td>
            `;
            cartBody.appendChild(row);
        });
    }
}

addBtn.addEventListener('click', () => {
    cart.push(servicesData[currentServiceIndex]);
    updateCartUI();
    nextService();
});

skipBtn.addEventListener('click', () => {
    nextService();
});

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (cart.length > 0) {
        alert('Booking successful! Amount: ₹' + cart.reduce((sum, item) => sum + item.price, 0));
        cart = [];
        updateCartUI();
        bookingForm.reset();
    }
});

renderCurrentService();
updateCartUI();