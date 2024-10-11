import CryptoJS from 'crypto-js';
import {map} from "lodash";

// Функция для хеширования и подготовки данных
export const hashRequestData = (dataToHash) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY_HASH; // Убедитесь, что ключ доступен в переменных окружения
  // Добавляем временную метку и преобразуем логические значения
  const preparedData = {
    ...dataToHash,
    ti: Math.floor(Date.now() / 1000),
  };
  Object.keys(preparedData).forEach(key => {
    if (typeof preparedData[key] === 'boolean') {
      preparedData[key] = preparedData[key] ? 1 : 0;
    }
  });

  // Создаем отсортированную строку для хеширования
  const sortedKeys = Object.keys(preparedData).sort();
  const dataString = map( sortedKeys, key => `${key}=${preparedData[key]}`).join('|');

  // Генерация HMAC SHA256 хеша
  const hash = CryptoJS.HmacSHA256(dataString, secretKey).toString(CryptoJS.enc.Hex);

  // Возвращаем исходные данные с добавленным хешем и временной меткой
  return { ...preparedData, si: hash };
};