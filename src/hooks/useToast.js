import Swal from 'sweetalert2';
import './styles.css'; // Путь к вашему CSS файлу

// Создаем кастомный хук useToast
const useToast = () => {
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

  // Функция для отображения уведомлений
  return async ({icon, title}) => {
    await Toast.fire({
      icon,
      title,
    });
  };
};

export default useToast;
