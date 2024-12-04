document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('schedulingForm');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const idCliente = document.getElementById('idCliente').value;
        const idVeiculo = document.getElementById('idVeiculo').value;
        const idServico = document.getElementById('idServico').value;
        const data = document.getElementById('dataAgendamento').value;
        const descricao = document.getElementById('descricaoAgendamento').value;
        
        const schedulingData = {
            idCliente: idCliente,
            idVeiculo: idVeiculo,
            idServico: idServico,
            data: data,
            descricao:descricao
        };
        

        try {
            const response = await fetch('http://localhost:8080/agendamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(schedulingData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Agendamento cadastrado com sucesso!');
                window.location.href = 'scheduling.html';
            } else {
                const error = await response.json();
                alert('Erro ao cadastrar agendamento: ' + error.message);
            }
        } catch (error) {
            alert('Erro na comunicação com o servidor: ' + error.message);
        }
    
        console.log(schedulingData);

    });
    
});
