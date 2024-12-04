document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    console.log('Service ID:', serviceId); // Verifique se o serviceId está correto

    if (!serviceId) {
        alert('ID do serviço não encontrado.');
        return;
    }

    try {
        // Fazendo a consulta ao serviço específico com base no serviceId
        const response = await fetch(`http://localhost:8080/servicos/${serviceId}`);
        
        if (response.ok) {
            const service = await response.json();
            
            console.log('Serviço carregado:', service);
            
            // Preenche os campos com os dados retornados
            document.getElementById('descricao').value = service.descricao || '';
           document.getElementById('preco').value = service.preco || '';
        } else {
            // Se não obtiver sucesso, exibe o erro
            alert('Erro ao carregar os dados do serviço.');
        }
    } catch (error) {
        // Em caso de erro na requisição
        alert('Erro na comunicação com o servidor: ' + error.message);
    }

    const form = document.getElementById('serviceForm');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

        
            const descricao = document.getElementById('descricaoServico').value;
            const preco = document.getElementById('precoServico').value;

            
            console.log('Valores do formulário:', { descricao, preco });

            
            const updatedService = {
                id: serviceId,
                descricao: descricao || undefined,
                preco: preco|| undefined
            };

            try {
                const response = await fetch(`http://localhost:8080/servicos`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedService),
                });

                console.log('Resposta da API:', response);

                if (response.ok) {
                    alert('Serviço atualizado com sucesso!');
                    window.location.href = 'services.html'; 
                } else {
                    const error = await response.json();
                    alert('Erro ao atualizar serviço: ' + error.message);
                }
            } catch (error) {
                alert('Erro na comunicação com o servidor: ' + error.message);
            }
        });
    } else {
        console.error('Formulário não encontrado!');
    }
});
