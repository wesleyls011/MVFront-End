document.addEventListener('DOMContentLoaded', () => {
    initializeVehicleCards();
});

function initializeVehicleCards() {
    const vehicleCards = document.querySelectorAll('.vehicle-card:not(.new-vehicle)');
    
    vehicleCards.forEach(card => {
        card.addEventListener('click', () => {
            handleVehicleCardClick(card);
        });
    });
}

function handleVehicleCardClick(card) {

    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = 'translateY(-4px)';
    }, 150);

    const vehicleModel = card.querySelector('h4').textContent;
    console.log(`Veículo selecionado: ${vehicleModel}`);
}

function openNewVehicleForm() {
    const modal = document.getElementById('newVehicleModal');
    modal.style.display = 'flex';
}

function closeNewVehicleForm() {
    const modal = document.getElementById('newVehicleModal');
    modal.style.display = 'none';
}

document.getElementById('newVehicleForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        model: document.getElementById('model').value,
        plate: document.getElementById('plate').value,
        year: document.getElementById('year').value,
        owner: document.getElementById('owner').value
    };

    console.log('Novo veículo:', formData);
    closeNewVehicleForm();
    
    e.target.reset();
});

document.getElementById('newVehicleModal').addEventListener('click', (e) => {
    if (e.target.id === 'newVehicleModal') {
        closeNewVehicleForm();
    }
});