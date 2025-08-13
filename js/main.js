
document.addEventListener('DOMContentLoaded', function() {
   
    // Elementos del DOM
    const elementos = {
       
        productosContainer: document.getElementById('productos-container'),
        serviciosContainer: document.getElementById('servicios-container'),
        navLinks: document.querySelectorAll('.nav-link'),
        contentSections: document.querySelectorAll('.content-section'),
        year: document.getElementById('year')
    };

    // Inicialización
    function init() {
        setupEventListeners();
  
    }

    // Configurar event listeners
    function setupEventListeners() {
    
        elementos.navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                cambiarSeccion(this.getAttribute('data-section'));
            });
        });
    }

   
    // Renderizar productos
    function renderProductos(productos) {
        elementos.productosContainer.innerHTML = '';
        
        if (productos.length === 0) {
            elementos.productosContainer.innerHTML = '<div class="empty">No hay productos disponibles</div>';
            return;
        }
        
        productos.forEach(producto => {
            const productoHTML = `
                <div class="producto" data-id="${producto.id}">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                    <div class="producto-info">
                        <h3 class="producto-titulo">${producto.nombre}</h3>
                        <p class="producto-descripcion">${producto.descripcion}</p>
                        <div class="producto-precio">$${producto.precio.toFixed(2)}</div>
                        <button class="btn-agregar">Agregar al carrito</button>
                    </div>
                </div>
            `;
            elementos.productosContainer.insertAdjacentHTML('beforeend', productoHTML);
        });
        
        // Agregar eventos a los nuevos botones
        document.querySelectorAll('.btn-agregar').forEach(btn => {
            btn.addEventListener('click', function() {
                const productoId = this.closest('.producto').getAttribute('data-id');
                agregarAlCarrito(productoId);
            });
        });
    }

    // Renderizar servicios
    function renderServicios(servicios) {
        elementos.serviciosContainer.innerHTML = '';
        
        if (servicios.length === 0) {
            elementos.serviciosContainer.innerHTML = '<div class="empty">No hay servicios disponibles</div>';
            return;
        }
        
        servicios.forEach(servicio => {
            const servicioHTML = `
                <div class="servicio" data-id="${servicio.id}">
                    <div class="servicio-icono">${servicio.icono}</div>
                    <h3 class="servicio-titulo">${servicio.nombre}</h3>
                    <p class="servicio-descripcion">${servicio.descripcion}</p>
                    <div class="servicio-precio">${servicio.precio}</div>
                </div>
            `;
            elementos.serviciosContainer.insertAdjacentHTML('beforeend', servicioHTML);
        });
    }


    // Funciones auxiliares
    function cambiarSeccion(sectionId) {
        elementos.navLinks.forEach(lnk => lnk.classList.remove('active'));
        elementos.contentSections.forEach(section => section.classList.remove('active'));
        
        document.querySelector(`.nav-link[data-section="${sectionId}"]`).classList.add('active');
        document.getElementById(sectionId).classList.add('active');
    }
    
       // Iniciar la aplicación
       init();
    });