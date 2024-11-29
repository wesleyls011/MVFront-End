document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.scheduling-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Add click animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);

            // Handle card click - you can add navigation or modal opening here
            if (!card.querySelector('.add-button')) {
                handleAppointmentClick(card);
            } else {
                handleNewAppointment();
            }
        });
    });
});

function handleAppointmentClick(card) {
    const appointmentInfo = card.querySelector('.appointment-info');
    const title = appointmentInfo?.querySelector('h4')?.textContent;
    console.log(`Abrindo detalhes do agendamento: ${title}`);
    // Add your logic to show appointment details
}

function handleNewAppointment() {
    console.log('Criando novo agendamento');
    // Add your logic to create new appointment
}