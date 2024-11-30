document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.scheduling-card');
    
    // ta faltando coisa nesses .js, ainda nao sei como arrumar

    cards.forEach(card => {
        card.addEventListener('click', () => {
            
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);

            
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
    
}

function handleNewAppointment() {
    console.log('Criando novo agendamento');
    
}