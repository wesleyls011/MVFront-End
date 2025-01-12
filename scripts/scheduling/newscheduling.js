document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('schedulingForm');

    async function fetchAndFillOptions(endpoint, selectElementId, placeholderText) {
        try {
            const response = await fetch(`http://localhost:8080/${endpoint}`);
            if (!response.ok) throw new Error(`Erro ao carregar ${placeholderText}`);
    
            const data = await response.json();
            console.log(data);
    
            if (!data.content || !Array.isArray(data.content)) {
                throw new Error(`Formato inesperado ao carregar ${placeholderText}`);
            }
    
            const selectElement = document.getElementById(selectElementId);
            
            selectElement.innerHTML = `<option value="">Selecione ${placeholderText}</option>`;
    
            data.content.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.nome || item.modelo || item.descricao;
                selectElement.appendChild(option);
            });
        } catch (error) {
            alert(`Erro ao carregar ${placeholderText}: ${error.message}`);
        }
    }    

    await fetchAndFillOptions('clientes', 'idCliente', 'clientes');
    await fetchAndFillOptions('veiculos', 'idVeiculo', 'veículos');
    await fetchAndFillOptions('servicos', 'idServico', 'serviços');

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
            descricao: descricao
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
                alert('Agendamento cadastrado com sucesso!');
                window.location.href = 'scheduling.html';
            } else {
                const error = await response.json();
                alert('Erro ao cadastrar agendamento: ' + error.message);
            }
        } catch (error) {
            alert('Erro na comunicação com o servidor: ' + error.message);
        }
    });
});
