// import testImage from './images/image.png';
// import './styles/index.css';
import { getCurrentSeasonInfo, getConstructorStandigs } from './api.js'
import { createSheduleTable } from './renderShedule.js'

// Глобальные константы
const scheduleTable = document.querySelector(".schedule-table"); // сводная таблица с информацией о гран-при сезона
const currentYear = 2024;
const currentSeasonData = await getCurrentSeasonInfo();

// Инициализация сводной таблицы по текущему сезону
createSheduleTable(scheduleTable, currentSeasonData);


// const test = initializePreparingStandingsData(currentYear);
// console.log(test);
