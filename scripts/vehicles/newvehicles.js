document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('vehicleForm');
    const selectCliente = document.getElementById('idCliente');

    async function fetchClientes() {
        try {
            const response = await fetch('http://localhost:8080/clientes');
            if (!response.ok) throw new Error('Erro ao carregar clientes.');

            const data = await response.json();

            if (!data.content || !Array.isArray(data.content)) {
                throw new Error('Formato inesperado na resposta do servidor.');
            }

            data.content.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id;
                option.textContent = cliente.nome;
                selectCliente.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
            alert('Erro ao carregar lista de clientes. Tente novamente mais tarde.');
        }
    }

    await fetchClientes();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const marca = document.getElementById('marca')?.value || '';
        const modelo = document.getElementById('modelo')?.value || '';
        const ano = document.getElementById('ano')?.value || '';
        const idCliente = selectCliente.value || '';

        const vehicleData = {
            marca: marca,
            modelo: modelo,
            ano: parseInt(ano),
            idCliente: parseInt(idCliente),
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
                window.location.href = 'vehicles.html';
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
