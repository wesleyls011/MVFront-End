function handleFormSubmit(form) {
    const formData = {
        client: form.client.value,
        vehicle: form.vehicle.value,
        service: form.service.value,
        date: form.date.value,
        time: form.time.value,
        notes: form.notes.value
    };

    // isso aqui nao ta funcionando!! vai dar 405, era apenas teste, ver funcionar na integração.

    if (!formData.client || !formData.vehicle || !formData.service || !formData.date || !formData.time) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    
    const existingSchedules = JSON.parse(localStorage.getItem('schedules')) || [];

    
    existingSchedules.push(formData);

    
    localStorage.setItem('schedules', JSON.stringify(existingSchedules));

    alert('Agendamento criado com sucesso!');

    
    window.location.href = 'scheduling.html'; 
}

document.addEventListener('DOMContentLoaded', () => {
    loadSchedules();
});

function loadSchedules() {
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    const scheduleContainer = document.getElementById('scheduleContainer'); 
    scheduleContainer.innerHTML = '';

    schedules.forEach(schedule => {
        const card = document.createElement('div');
        card.className = 'schedule-card';
        card.innerHTML = `
            <h3>${schedule.client}</h3>
            <p><strong>Veículo:</strong> ${schedule.vehicle}</p>
            <p><strong>Serviço:</strong> ${schedule.service}</p>
            <p><strong>Data:</strong> ${schedule.date}</p>
            <p><strong>Hora:</strong> ${schedule.time}</p>
            <p><strong>Notas:</strong> ${schedule.notes}</p>
        `;
        scheduleContainer.appendChild(card);
    });
}
