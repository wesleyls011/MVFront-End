function handleNavigation(section) {
    const button = document.querySelector(`[data-section="${section}"]`);
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'translateY(-2px)';
    }, 150);

    console.log(`Navegando para a seção: ${section}`);

    
    switch (section) { // se nao tiver window.location ele tambem nao vai funcionar
        case 'scheduling':
            window.location.href = '../pages/scheduling.html';
            break;
        case 'vehicles':
            window.location.href = '../pages/vehicles.html';
            break;
        case 'clients':
            window.location.href = '../pages/clients.html';
            break;
        case 'services':
            window.location.href = '../pages/services.html';
            break;
        default:
            console.log('Seção não encontrada');
            break;
    }
}