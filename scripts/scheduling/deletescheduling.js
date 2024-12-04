function deleteScheduling(schedulingId) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este agendamento?');
    if (!confirmDelete) {
        return;
    }
    
    console.log(schedulingId);

    fetch(`http://localhost:8080/agendamentos/${schedulingId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Agendamento deletado com sucesso!');
            location.reload();
            
            const schedulingCard = document.getElementById(`scheduling-${schedulingId}`);
            if (schedulingCard) {
                schedulingCard.remove();
            }
        } else if (response.status === 404) {
            alert('Agendamento não encontrado!');
        } else {
            alert('Erro ao deletar o agendamento');
        }
    })
    .catch(error => {
        alert('Erro na comunicação com o servidor: ' + error.message);
    });
}