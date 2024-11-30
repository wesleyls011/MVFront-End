document.addEventListener('DOMContentLoaded', () => {
    initializeServiceCards();
});

function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card:not(.new-service)');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            handleServiceCardClick(card);
        });
    });
}
   // tem que ver se vai usar esses js pra abrir novo cadastro ou usar o html msm
function handleServiceCardClick(card) {

    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = 'translateY(-4px)';
    }, 150);

    const serviceName = card.querySelector('h4').textContent;
    console.log(`Serviço selecionado: ${serviceName}`);
}

function openNewServiceForm() {  // esse aqui ta funcionando mas nao era pra estar!!
    const modal = document.getElementById('newServiceModal');
    modal.style.display = 'flex';
}

function closeNewServiceForm() {
    const modal = document.getElementById('newServiceModal');
    modal.style.display = 'none';
}

document.getElementById('newServiceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        duration: document.getElementById('duration').value,
        price: document.getElementById('price').value,
        tags: document.getElementById('tags').value.split(',').map(tag => tag.trim())
    };

    console.log('Novo serviço:', formData);
    closeNewServiceForm();

    e.target.reset();
});

document.getElementById('newServiceModal').addEventListener('click', (e) => {
    if (e.target.id === 'newServiceModal') {
        closeNewServiceForm();
    }
});