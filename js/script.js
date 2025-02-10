document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    let currentActiveContent = null; 

    function hideAllContent(callback) {
        if (currentActiveContent) {
            currentActiveContent.classList.add('slide-out'); 
  
            currentActiveContent.addEventListener('animationend', () => {
                currentActiveContent.style.display = 'none';
                currentActiveContent.classList.remove('slide-out');
                if (callback) callback(); 
            }, { once: true });
        } else if (callback) {
            callback();
        }
    }

    function showContent(contentId) {
        const contentToShow = document.getElementById(contentId);
        if (contentToShow) {

            hideAllContent(() => {
                contentToShow.classList.add('slide-in'); 
                contentToShow.style.display = 'block';
                currentActiveContent = contentToShow; 

                contentToShow.addEventListener('animationend', () => {
                    contentToShow.classList.remove('slide-in');
                }, { once: true });
            });
        }
    }

    function updateActiveItem(selectedItem) {
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        selectedItem.classList.add('active');
    }


    navItems.forEach(item => {
        item.addEventListener('click', () => {
            updateActiveItem(item);
            const contentId = item.getAttribute('data-content'); 
            showContent(contentId); 
        });
    });


    document.querySelectorAll('#animatedName span').forEach(letter => {
        letter.addEventListener('mouseenter', () => {
          letter.classList.add('jump'); 
        });
      
        letter.addEventListener('animationend', () => {
          letter.classList.remove('jump'); 
        });
      });
      
 
    updateActiveItem(navItems[0]);
    showContent(navItems[0].getAttribute('data-content'));

    const options = document.querySelectorAll('#tec-content .options-list li');

    // Función para ocultar todos los detalles
    function hideDetails() {
      document.querySelectorAll('.option-details').forEach(d => {
        d.style.display = 'none';
      });
    }
    
    options.forEach(option => {
      option.addEventListener('click', (event) => {
        // Detiene la propagación para que el documento no capture este clic
        event.stopPropagation();
    
        const details = option.querySelector('.option-details');
        const isActive = details.style.display === 'block';
    
        // Cierra todos los detalles si se hace clic en una opción
        hideDetails();
      
        // Si la opción no estaba activa, muestra sus detalles
        if (!isActive) {
          details.style.display = 'block';
        }
      });
    });
    
    // Agrega un evento click al documento para cerrar los detalles si se hace clic fuera de ellos
    document.addEventListener('click', () => {
      hideDetails();
    });
    
    // Previene que los clics dentro de los detalles cierren estos
    document.querySelectorAll('.option-details').forEach(detail => {
      detail.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    });
    
    
});
