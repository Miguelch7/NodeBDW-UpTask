import Swal from 'sweetalert2';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', () => {
        Swal.fire({
            title: '¿Deseas borrar este proyecto?',
            text: 'Un proyecto eliminado no se puede recuperar',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Proyecto Eliminado!',
                    'El proyecto se ha eliminado correctamente.',
                    'success'
                );
    
                // Redireccionar al inicio
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
            };
        });
    });
};

export default btnEliminar;