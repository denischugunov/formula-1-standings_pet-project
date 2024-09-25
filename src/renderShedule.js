import { compareDateWithNow } from './utils.js'
import { getCurrentSeasonInfo } from './api.js'

// Функция рендера таблицы с информацией о гран-при сезона
export async function createSheduleTable(scheduleTable, seasonData) {
    seasonData.forEach((grandPrix) => {
      const completedRace = compareDateWithNow(grandPrix.date);
      if (completedRace) {
        scheduleTable.insertAdjacentHTML(
          "beforeend",
          `<tr><td>${grandPrix.round}</td><td><a href=${grandPrix.url} target="_blank">${grandPrix.raceName}</a></td><td>${grandPrix.date}</td><td><a class='active'>Результаты</a></td></tr>`
        );
      } else {
        scheduleTable.insertAdjacentHTML(
          "beforeend",
          `<tr><td>${grandPrix.round}</td><td><a href=${grandPrix.url} target="_blank">${grandPrix.raceName}</a></td><td>${grandPrix.date}</td><td>Результаты</td></tr>`
        );
      }
    });
  }