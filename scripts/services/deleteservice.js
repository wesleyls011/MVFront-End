function deleteService(serviceId) {
    
    const confirmDelete = confirm('Tem certeza que deseja excluir este serviço?');
    if (!confirmDelete) {
        return;
    }

    fetch(`http://localhost:8080/servicos/${serviceId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Serviço deletado com sucesso!');
            location.reload();

            const serviceCard = document.getElementById(`service-${serviceId}`);
            if (serviceCard) {
                serviceCard.remove();
            }
        } else if (response.status === 404) {
            alert('Serviço não encontrado!');
        } else {
            alert('Erro ao deletar o serviço');
        }
    })
    .catch(error => {
        alert('Erro na comunicação com o servidor: ' + error.message);
    });
}
