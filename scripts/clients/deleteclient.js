function deleteClient(clientId) {
    
    const confirmDelete = confirm('Tem certeza que deseja excluir este cliente?');
    if (!confirmDelete) {
        return;
    }

    fetch(`http://localhost:8080/clientes/${clientId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Cliente deletado com sucesso!');
            location.reload();

            const clientCard = document.getElementById(`client-${clientId}`);
            if (clientCard) {
                clientCard.remove();
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
