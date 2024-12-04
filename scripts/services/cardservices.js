document.addEventListener('DOMContentLoaded', () => {
    const servicesGrid = document.getElementById('serviceGrid');

    async function loadServices() {
        try {
            const response = await fetch('http://localhost:8080/servicos');
            if (response.ok) {
                const data = await response.json();
                const services = data.content;
                console.log(services);
                if (Array.isArray(services)) {
                    displayServices(services);
                } else {
                    alert('Erro: os dados não são um array.');
                }
            } else {
                alert('Erro ao carregar serviços.');
            }
        } catch (error) {
            alert('Erro na comunicação com o servidor: ' + error.message);
        }
    }
    

    
    function displayServices(services) {
        const servicesContainer = document.querySelector('.services-grid');
        services.forEach(service => {
            
            const serviceDescription = service.descricao || 'Descrição não informada';
            const serviceAvatar = service.descricao[0];
    
            const serviceCard = document.createElement('div');
            serviceCard.classList.add('service-card');
            
    
            const serviceInfo = `
            <div class="service-info">
                <div class="service-avatar">
                    <i class="fas fa-cogs"></i> <!-- Engrenagem -->
                </div> <!-- Primeira letra da descricao -->
                <h4>${service.descricao}</h4>
                <p>Preço: R$${service.preco || 'Preço não informado'}</p>
                <div class="action-buttons">
                    <button class="edit-button" onclick="window.location.href='updateservices.html?id=${service.id}'">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-button" onclick="deleteService(${service.id})">
                        <i class="fas fa-trash"></i> 
                    </button>
                </div>
            </div>
        `;
        
            serviceCard.innerHTML = serviceInfo;
            servicesContainer.appendChild(serviceCard);
        });
    }

    loadServices();
});

