document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
});

function initializeForm() {
    const form = document.getElementById('newSchedulingForm');
    const clientSelect = document.getElementById('client');
    const vehicleSelect = document.getElementById('vehicle');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Update vehicle options based on selected client
    clientSelect.addEventListener('change', () => {
        updateVehicleOptions(clientSelect.value);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(form);
    });
}

function updateVehicleOptions(clientId) {
    const vehicleSelect = document.getElementById('vehicle');
    vehicleSelect.innerHTML = '<option value="">Selecione um veículo</option>';

    // Mock data - in a real application, this would come from a database
    const clientVehicles = {
        '1': [
            { id: 1, name: 'Fiat Uno - ABC-1234' },
            { id: 4, name: 'Honda CB 300 - JKL-3456' }
        ],
        '2': [
            { id: 2, name: 'Honda Fit - DEF-5678' }
        ],
        '3': [
            { id: 3, name: 'VW Gol - GHI-9012' },
            { id: 5, name: 'Yamaha Factor - MNO-7890' }
        ]
    };

    if (clientId && clientVehicles[clientId]) {
        clientVehicles[clientId].forEach(vehicle => {
            const option = document.createElement('option');
            option.value = vehicle.id;
            option.textContent = vehicle.name;
            vehicleSelect.appendChild(option);
        });
    }
}

function handleFormSubmit(form) {
    const formData = {
        client: form.client.value,
        vehicle: form.vehicle.value,
        service: form.service.value,
        date: form.date.value,
        time: form.time.value,
        notes: form.notes.value
    };

    // Adicionar animação de feedback ao botão de submit
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.style.transform = 'scale(0.98)';
    setTimeout(() => {
        submitButton.style.transform = '';
    }, 150);

    console.log('Novo agendamento:', formData);
    
    // Em uma aplicação real, aqui você enviaria os dados para o servidor
    // Por enquanto, vamos apenas simular um sucesso e redirecionar
    setTimeout(() => {
        window.location.href = 'scheduling.html';
    }, 500);
}

// Validação de horário comercial
document.getElementById('time').addEventListener('change', (e) => {
    const time = e.target.value;
    const hour = parseInt(time.split(':')[0]);
    
    if (hour < 8 || hour >= 18) {
        alert('Por favor, selecione um horário entre 8:00 e 18:00');
        e.target.value = '';
    }
});