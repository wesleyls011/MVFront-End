document.addEventListener('DOMContentLoaded', () => {
    const vehiclesGrid = document.getElementById('vehiclesGrid');

    async function loadVehicles() {
        try {
            const response = await fetch('http://localhost:8080/veiculos');
            if (response.ok) {
                const data = await response.json();
                const vehicles = data.content;
                console.log(vehicles);
                if (Array.isArray(vehicles)) {
                    displayVehicles(vehicles);
                } else {
                    alert('Erro: os dados não são um array.');
                }
            } else {
                alert('Erro ao carregar veículos.');
            }
        } catch (error) {
            alert('Erro na comunicação com o servidor: ' + error.message);
        }
    }
    
    async function displayVehicles(vehicles) {
        const vehiclesContainer = document.querySelector('.vehicles-grid');
        vehicles.forEach(vehicle => {
            const vehicleCard = document.createElement('div');
            vehicleCard.classList.add('vehicle-card');
            
            const vehicleInfo = `
                <div class="vehicle-info">
                    
                    <div class="vehicle-avatar">🚘</div>
                    
                    <div class="vehicle-details">
                        <h4>${vehicle.marca} ${vehicle.modelo}</h4>
                        <p>📅 Ano: ${vehicle.ano || 'Não Informado'}</p>
                        <p>🔑 Cliente: ${vehicle.nomeCliente || 'Não Informado'}</p>
                        <div class="action-buttons">
                            <!-- Botões de ação: Editar e Excluir -->
                            <button class="edit-button" onclick="window.location.href='updatevehicles.html?id=${vehicle.id}'">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="delete-button" onclick="deleteVehicle(${vehicle.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            vehicleCard.innerHTML = vehicleInfo;
            vehiclesContainer.appendChild(vehicleCard);
        });
    }

    loadVehicles();
});
