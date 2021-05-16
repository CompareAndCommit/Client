import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal);

const Toast = mySwal.mixin({
    toast: true,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true,
})

export const myToast = (icon, title) => Toast.fire({
    icon : icon,
    title : title
})