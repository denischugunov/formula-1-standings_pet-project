// Функция возвращает длину текущего сезона (количество гран-при)
export async function defineSeasonLength(currentSeasonData) {
  return currentSeasonData.length;
}

// Функция возвращает порядковый номер последнего проведенного гран-при
export function defineCurrentRound(currentSeasonData) {
  let lastRoundNumber;
  for (const grandPrix of currentSeasonData) {
    const completedRace = compareDateWithNow(grandPrix.date);
    if (!completedRace) {
      lastRoundNumber = grandPrix.round - 1;
      break;
    }
  }
  return lastRoundNumber;
}

// Функция для проверки прошел ли гран-при или еще нет
export function compareDateWithNow(grandPrixDate) {
  const targetDate = new Date(grandPrixDate);
  const currentDate = new Date();

  return targetDate < currentDate;
}

// Функция для получения информации о ближайшем гран-при
export function getDataOfNearestGrandPrix(currentSeasonData) {
  return currentSeasonData.find(
    (grandPrix) => !compareDateWithNow(grandPrix.date)
  );
}

// Функция для получения информации о последнем прошедшем гран-при
export function getDataOfLastGrandPrix(currentSeasonData) {
  const lastGrandPrix = currentSeasonData.filter((grandPrix) =>
    compareDateWithNow(grandPrix.date)
  );
  return lastGrandPrix.at(-1);
}

// Функция генерации случайного цвета
export function getRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

// Функция для постановки окончания в слове "день"
export function getDayLabel(days) {
  if (days === 0) {
    return `${days} дней`;
  } else if (days === 1) {
    return `${days} день`;
  } else if (days >= 2 && days <= 4) {
    return `${days} дня`;
  } else if ((days >= 5 && days <= 20) || days % 10 >= 5 || days % 10 === 0) {
    return `${days} дней`;
  } else if (days % 10 >= 2 && days % 10 <= 4) {
    return `${days} дня`;
  } else {
    return `${days} дней`;
  }
}

export const currentYear = new Date().getFullYear();
