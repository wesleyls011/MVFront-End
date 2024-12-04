function handleNavigation(section) {
    const button = document.querySelector(`[data-section="${section}"]`);
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'translateY(-2px)';
    }, 150);

    console.log(`Navegando para a seção: ${section}`);

    
    switch (section) { // se nao tiver window.location ele tambem nao vai funcionar
        case 'scheduling':
            window.location.href = '../pages/scheduling.html';
            break;
        case 'vehicles':
            window.location.href = '../pages/vehicles.html';
            break;
        case 'clients':
            window.location.href = '../pages/clients.html';
            break;
        case 'services':
            window.location.href = '../pages/services.html';
            break;
        default:
            console.log('Seção não encontrada');
            break;
    }

async function listarClientes() {
    try {
        const response = await fetch('http://localhost:8080/clientes');
        
        if (!response.ok) {
            throw new Error('Erro ao buscar clientes');
        }

        const clientes = await response.json();

        const listaClientes = document.getElementById('clientes-lista');
        listaClientes.innerHTML = ''; 

        if (clientes.length > 0) {
            clientes.forEach(cliente => {
                const divCliente = document.createElement('div');
                divCliente.classList.add('cliente');
                divCliente.innerHTML = `
                    <p><strong>Nome:</strong> ${cliente.nome}</p>
                    <p><strong>Email:</strong> ${cliente.email}</p>
                    <p><strong>Telefone:</strong> ${cliente.telefone}</p>
                    <p><strong>CPF:</strong> ${cliente.cpf}</p>
                `;
                listaClientes.appendChild(divCliente);
            });
        } else {
            listaClientes.innerHTML = '<p>Nenhum cliente encontrado.</p>';
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao buscar os clientes.');
    }
}

}