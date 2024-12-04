document.addEventListener('DOMContentLoaded', () => {
    const schedulingGrid = document.querySelector('.scheduling-grid'); 

    async function loadScheduling() {
        try {
            const response = await fetch('http://localhost:8080/agendamentos');
            if (response.ok) {
                const data = await response.json();
                const scheduling = data.content;
                if (Array.isArray(scheduling)) {
                    displayScheduling(scheduling);
                } else {
                    alert('Erro: os dados não são um array.');
                }
            } else {
                alert('Erro ao carregar agendamentos.');
            }
        } catch (error) {
            alert('Erro na comunicação com o servidor: ' + error.message);
            console.error('Erro ao carregar agendamentos:', error);  
        }
    }

    async function displayScheduling(scheduling) {
        const schedulingContainer = document.querySelector('.scheduling-grid');
        scheduling.forEach(appointment => {
            const schedulingCard = document.createElement('div');
            schedulingCard.classList.add('scheduling-card');
            
            const schedulingInfo = `
                <div class="scheduling-info">
                    <div class="scheduling-avatar">📅</div>
                    <div class="scheduling-details">
                        <h4>Agendamento: ${appointment.id}</h4>
                        <p>🚗 Veículo: ${appointment.idVeiculo || 'Não Informado'}</p>
                        <p>📅 Data: ${appointment.data || 'Não Informada'}</p>
                        <p>👤 Cliente: ${appointment.idCliente || 'Não Informado'}</p>
                         <p>🔧 Servico: ${appointment.idServico || 'Não Informado'}</p>
                        <div class="action-buttons">
                            <!-- Botões de ação: Editar e Excluir -->
                            <button class="edit-button" onclick="window.location.href='updatescheduling.html?id=${appointment.id}'">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="delete-button" onclick="deleteScheduling(${appointment.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            schedulingCard.innerHTML = schedulingInfo;
            schedulingContainer.appendChild(schedulingCard);
        });
    }

    loadScheduling();
});