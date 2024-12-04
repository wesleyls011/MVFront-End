document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const schedulingId = urlParams.get('id');  

    console.log('Scheduling ID:', schedulingId);

    if (!schedulingId) {
        alert('ID do agendamento não encontrado.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/agendamentos/${schedulingId}`);
        
        if (response.ok) {
            const scheduling = await response.json();

            document.getElementById('data').value = scheduling.data || '';

        } else {
            alert('Erro ao carregar os dados do agendamento.');
        }
    } catch (error) {
        alert('Erro na comunicação com o servidor: ' + error.message);
    }

    const form = document.getElementById('schedulingForm');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const data = document.getElementById('data').value;

            const updatedScheduling = { id: schedulingId, data};

            try {
                const response = await fetch(`http://localhost:8080/agendamentos/${schedulingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedScheduling),
                });

                if (response.ok) {
                    alert('Agendamento atualizado com sucesso!');
                    window.location.href = 'scheduling.html'; // Redireciona para a página de agendamentos
                } else {
                    const error = await response.json();
                    alert('Erro ao atualizar agendamento: ' + error.message);
                }
            } catch (error) {
                alert('Erro na comunicação com o servidor: ' + error.message);
            }
        });
    }
});