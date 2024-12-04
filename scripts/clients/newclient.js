document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('schedulingForm');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;

        const clientData = {
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone
        };

        try {
            const response = await fetch('http://localhost:8080/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clientData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Cliente cadastrado com sucesso!');
                window.location.href = 'clients.html';
            } else {
                const error = await response.json();
                alert('Erro ao cadastrar cliente: ' + error.message);
            }
        } catch (error) {
            alert('Erro na comunicação com o servidor: ' + error.message);
        }
    
        console.log(clientData);

    });
    
});
