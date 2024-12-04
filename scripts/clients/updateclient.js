document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('id');

    if (!clientId) {
        alert('ID do cliente não encontrado.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/clientes/${clientId}`);
        if (response.ok) {
            const cliente = await response.json();
            
            console.log('Cliente carregado:', cliente);
            
            document.getElementById('nome').value = cliente.nome || '';
            document.getElementById('email').value = cliente.email || '';
            document.getElementById('telefone').value = cliente.telefone || '';
        } else {
            alert('Erro ao carregar os dados do cliente.');
        }
    } catch (error) {
        alert('Erro na comunicação com o servidor: ' + error.message);
    }

    const form = document.getElementById('schedulingForm');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

        
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;

            
            console.log('Valores do formulário:', { nome, email, telefone });

            
            const updatedClient = {
                id: clientId,
                nome: nome || undefined,
                email: email || undefined,
                telefone: telefone || undefined,
            };

            try {
                const response = await fetch(`http://localhost:8080/clientes/${clientId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedClient),
                });

                console.log('Resposta da API:', response);

                if (response.ok) {
                    alert('Cliente atualizado com sucesso!');
                    window.location.href = 'clients.html'; 
                } else {
                    const error = await response.json();
                    alert('Erro ao atualizar cliente: ' + error.message);
                }
            } catch (error) {
                alert('Erro na comunicação com o servidor: ' + error.message);
            }
        });
    } else {
        console.error('Formulário não encontrado!');
    }
});
