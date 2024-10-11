import Swal from 'sweetalert2';
import './styles.css'; // Путь к вашему CSS файлу

// Функция для создания уведомлений с помощью SweetAlert2
export const showToast = async ({ icon, title }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  await Toast.fire({
    icon,
    title,
  });
};