document.getElementById('schedulingForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const data = {
        clientCPF: document.getElementById('clientCPF').value,
        veiculoPlaca: document.getElementById('veiculoPlaca').value,
        dataAgendamento: document.getElementById('dataAgendamento').value,
        idServico: document.getElementById('idServico').value
    };

    try {
        const response = await fetch('http://localhost:8080/agendamentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Agendamento criado com sucesso!');
            window.location.href = 'scheduling.html';
        } else {
            alert('Erro ao criar agendamento.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar ao servidor.');
    }

    async function carregarAgendamentos() {
        try {
            const response = await fetch('http://localhost:8080/agendamentos');
            if (response.ok) {
                const data = await response.json();
                const tabela = document.getElementById('tabelaAgendamentos');
    
                data.content.forEach(agendamento => {
                    const linha = document.createElement('tr');
                    linha.innerHTML = `
                        <td>${agendamento.id}</td>
                        <td>${agendamento.clientCPF}</td>
                        <td>${agendamento.veiculoPlaca}</td>
                        <td>${agendamento.dataAgendamento}</td>
                        <td>${agendamento.idServico}</td>
                        <td>
                            <button onclick="editarAgendamento(${agendamento.id})">Editar</button>
                            <button onclick="excluirAgendamento(${agendamento.id})">Excluir</button>
                        </td>
                    `;
                    tabela.appendChild(linha);
                });
            } else {
                alert('Erro ao carregar agendamentos.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }
    carregarAgendamentos();
    

    async function editarAgendamento(id) {
        const data = {
            id: id,
            // Atualize com os novos dados obtidos do formulário ou inputs
        };
    
        try {
            const response = await fetch(`http://localhost:8080/agendamentos`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                alert('Agendamento atualizado com sucesso!');
                window.location.reload();
            } else {
                alert('Erro ao atualizar agendamento.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    
    async function excluirAgendamento(id) {
        if (!confirm('Tem certeza que deseja excluir este agendamento?')) return;
    
        try {
            const response = await fetch(`http://localhost:8080/agendamentos/${id}`, {
                method: 'DELETE'
            });
    
            if (response.ok) {
                alert('Agendamento excluído com sucesso!');
                window.location.reload();
            } else {
                alert('Erro ao excluir agendamento.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }
    

});
