document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vehicleForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Obtendo os valores dos campos do formulário
        const marca = document.getElementById('marca')?.value || '';
        const modelo = document.getElementById('modelo')?.value || '';
        const ano = document.getElementById('ano')?.value || '';
        const idCliente = document.getElementById('idCliente')?.value || '';

        // Validação simples antes do envio

        const vehicleData = {
            marca: marca,
            modelo: modelo,
            ano: parseInt(ano),
            idCliente: parseInt(idCliente)
        };

        try {
            const response = await fetch('http://localhost:8080/veiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicleData),
            });

            if (response.ok) {
                alert('Veículo cadastrado com sucesso!');
                window.location.href = 'vehicles.html'; // Redirecionar após sucesso
            } else {
                const error = await response.json();
                alert('Erro ao cadastrar veículo: ' + (error.message || 'Erro desconhecido.'));
            }
        } catch (error) {
            console.error('Erro na comunicação com o servidor:', error);
            alert('Erro ao comunicar com o servidor. Verifique sua conexão.');
        }
    });
});
