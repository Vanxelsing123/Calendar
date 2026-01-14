export const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const parseDate = (str) => {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const isSameDay = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

export const getMonthName = (date) => {
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const getWeekdayShort = (dayIndex) => {
  const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  return days[dayIndex];
};

// Расчет типа смены для конкретной бригады
export const getShiftType = (date, startDate, startShiftType = 'day-shift') => {
  const diffTime = date - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Цикл: день → ночь → отсыпной → выходной
  const cycle = ['day-shift', 'night-shift', 'rest-day', 'day-off'];
  
  const position = diffDays % 4;
  
  // Корректируем для отрицательных значений
  return cycle[(position + 4) % 4];
};

export const getShiftLabel = (type) => {
  const labels = {
    'day-shift': 'День',
    'night-shift': 'Ночь',
    'rest-day': 'Отсыпной',
    'day-off': 'Выходной',
    'vacation': 'Отпуск',
    'sick-leave': 'Больничный'
  };
  return labels[type] || type;
};
