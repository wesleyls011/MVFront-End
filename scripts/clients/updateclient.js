document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('id');

    if (!clientId) {
        alert('ID do cliente não encontrado.');
        return;
    }

    try {
        // Buscar os dados do cliente na API
        const response = await fetch(`http://localhost:8080/cliente/${clientId}`);
        if (response.ok) {
            const client = await response.json();

            // Preencher o formulário com as informações do cliente
            document.getElementById('nome').value = client.nome || '';
            document.getElementById('email').value = client.email || '';
            document.getElementById('telefone').value = client.telefone || '';
        } else {
            alert('Erro ao carregar os dados do cliente.');
        }
    } catch (error) {
        alert('Erro na comunicação com o servidor: ' + error.message);
    }

    // Lidar com o envio do formulário
    const form = document.getElementById('updateClientForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;

        const updatedClient = { nome, email, telefone };

        try {
            const response = await fetch(`http://localhost:8080/cliente/${clientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedClient),
            });

            if (response.ok) {
                alert('Cliente atualizado com sucesso!');
                window.location.href = 'clients.html'; // Redireciona de volta para a lista de clientes
            } else {
                const error = await response.json();
                alert('Erro ao atualizar cliente: ' + error.message);
            }
        } catch (error) {
            alert('Erro na comunicação com o servidor: ' + error.message);
        }
    });
});
