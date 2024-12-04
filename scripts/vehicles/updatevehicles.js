document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleId = urlParams.get('id');

    console.log('Vehicle ID:', vehicleId);

    if (!vehicleId) {
        alert('ID do veículo não encontrado.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/veiculos/${vehicleId}`);
        
        if (response.ok) {
            const vehicle = await response.json();

            document.getElementById('marca').value = vehicle.marca || '';
            document.getElementById('modelo').value = vehicle.modelo || '';
            document.getElementById('ano').value = vehicle.ano || '';
            document.getElementById('clienteId').value = vehicle.idCliente || '';
        } else {
            alert('Erro ao carregar os dados do veículo.');
        }
    } catch (error) {
        alert('Erro na comunicação com o servidor: ' + error.message);
    }

    const form = document.getElementById('vehicleForm');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const marca = document.getElementById('marca').value;
            const modelo = document.getElementById('modelo').value;
            const ano = document.getElementById('ano').value;
            const clienteId = document.getElementById('clienteId').value;

            const updatedVehicle = { id: vehicleId, marca, modelo, ano, clienteId };

            try {
                const response = await fetch(`http://localhost:8080/veiculos/${vehicleId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedVehicle),
                });

                if (response.ok) {
                    alert('Veículo atualizado com sucesso!');
                    window.location.href = 'vehicles.html';
                } else {
                    const error = await response.json();
                    alert('Erro ao atualizar veículo: ' + error.message);
                }
            } catch (error) {
                alert('Erro na comunicação com o servidor: ' + error.message);
            }
        });
    }
});