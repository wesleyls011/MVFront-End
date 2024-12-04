function deleteVehicle(vehicleId) {
    
    const confirmDelete = confirm('Tem certeza que deseja excluir este veiculo?');
    if (!confirmDelete) {
        return;
    }

    fetch(`http://localhost:8080/veiculos/${vehicleId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Veiculo deletado com sucesso!');
            location.reload();

            const vehicleCard = document.getElementById(`vehicle-${vehicleId}`);
            if (vehicleCard) {
                vehicleCard.remove();
            }
        } else if (response.status === 404) {
            alert('Veiculo não encontrado!');
        } else {
            alert('Erro ao deletar o veiculo');
        }
    })
    .catch(error => {
        alert('Erro na comunicação com o servidor: ' + error.message);
    });
}
