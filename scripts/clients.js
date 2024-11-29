document.addEventListener('DOMContentLoaded', () => {
    initializeClientCards();
});

function initializeClientCards() {
    const clientCards = document.querySelectorAll('.client-card:not(.new-client)');
    
    clientCards.forEach(card => {
        card.addEventListener('click', () => {
            handleClientCardClick(card);
        });
    });
}

function handleClientCardClick(card) {
    // Adicionar animação de feedback ao clicar
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = 'translateY(-4px)';
    }, 150);

    const clientName = card.querySelector('h4').textContent;
    console.log(`Cliente selecionado: ${clientName}`);
}

function openNewClientForm() {
    const modal = document.getElementById('newClientModal');
    modal.style.display = 'flex';
}

function closeNewClientForm() {
    const modal = document.getElementById('newClientModal');
    modal.style.display = 'none';
}

document.getElementById('newClientForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };

    console.log('Novo cliente:', formData);
    closeNewClientForm();
    
    // Limpar formulário
    e.target.reset();
});

// Fechar modal ao clicar fora
document.getElementById('newClientModal').addEventListener('click', (e) => {
    if (e.target.id === 'newClientModal') {
        closeNewClientForm();
    }
});