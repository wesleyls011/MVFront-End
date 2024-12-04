document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('serviceForm');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const descricao = document.getElementById('descricaoServico').value;
        const preco = document.getElementById('precoServico').value;
        
        const serviceData = {
            descricao: descricao,
            preco: preco
        };
        

        try {
            const response = await fetch('http://localhost:8080/servicos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Serviço cadastrado com sucesso!');
                window.location.href = 'services.html';
            } else {
                const error = await response.json();
                alert('Erro ao cadastrar servico: ' + error.message);
            }
        } catch (error) {
            alert('Erro na comunicação com o servidor: ' + error.message);
        }
    
        console.log(serviceData);

    });
    
});
