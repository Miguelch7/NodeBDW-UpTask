import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;

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

                // Enviar petición a Axios
                const url = `${ location.origin }/proyectos/${ urlProyecto }`;

                axios.delete(url, { params: { urlProyecto } }).then((respuesta) => {
                    Swal.fire(
                        'Proyecto Eliminado!',
                        respuesta.data,
                        'success'
                    );

                    // Redireccionar al inicio
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                })
                .catch(() => {
                    Swal.fire(
                        'Hubo un error',
                        'No se pudo eliminar el proyecto',
                        'error'
                    );
                });


            };
        });
    });
};

export default btnEliminar;