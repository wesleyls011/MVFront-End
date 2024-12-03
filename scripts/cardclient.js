document.addEventListener('DOMContentLoaded', () => {
    const clientsGrid = document.getElementById('clientsGrid');

    async function loadClients() {
        try {
            const response = await fetch('http://localhost:8080/cliente');
            if (response.ok) {
                const data = await response.json();
                const clients = data.content;
                console.log(clients);
                if (Array.isArray(clients)) {
                    displayClients(clients);
                } else {
                    alert('Erro: os dados não são um array.');
                }
            } else {
                alert('Erro ao carregar clientes.');
            }
        } catch (error) {
            alert('Erro na comunicação com o servidor: ' + error.message);
        }
    }
    

    
    function displayClients(clients) {
        const clientsContainer = document.querySelector('.clients-grid');
        clients.forEach(client => {
            
            const clientName = client.nome || 'Nome Não Informado';
            const clientAvatar = client.nome[0];
    
            const clientCard = document.createElement('div');
            clientCard.classList.add('client-card');
            
    
            const clientInfo = `
                <div class="client-info">
                    <div class="client-avatar">${clientAvatar}</div> <!-- Primeira letra do nome -->
                    <h4>${client.nome}</h4>
                    <p>📱 ${client.telefone || 'Telefone não informado'}</p>
                    <p>📧 ${client.email || 'E-mail não informado'}</p>
                    <div class="clientes-veiculos">
                        ${client.veiculos ? client.veiculos.map(veiculo => `<span class="veiculo-tag">${veiculo}</span>`).join('') : 'Veículos não informados'}
                    </div>
                    <div class="action-buttons">
                        <button class="edit-button" onclick="window.location.href='updateclients.html'">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-button" onclick="deleteClient(${client.id})">
                            <i class="fas fa-trash"></i> 
                        </button>
                    </div>
                </div>
            `;
            clientCard.innerHTML = clientInfo;
            clientsContainer.appendChild(clientCard);
        });
    }
    
    function deleteClient(clientId) {
        // Confirmação de exclusão antes de enviar a requisição
        const confirmDelete = confirm('Tem certeza que deseja excluir este cliente?');
        if (!confirmDelete) {
            return;
        }
    
        // Envia uma requisição DELETE para o servidor para excluir o cliente
        fetch(`http://localhost:8080/cliente/${clientId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                alert('Cliente deletado com sucesso!');
                // Remove o cartão do cliente da interface
                const clientCard = document.getElementById(`client-${clientId}`);
                if (clientCard) {
                    clientCard.remove(); // Remove o cartão do cliente
                }
            } else if (response.status === 404) {
                alert('Cliente não encontrado!');
            } else {
                alert('Erro ao deletar o cliente');
            }
        })
        .catch(error => {
            alert('Erro na comunicação com o servidor: ' + error.message);
        });
    }
    
    
    

    loadClients();
});

