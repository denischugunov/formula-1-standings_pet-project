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
