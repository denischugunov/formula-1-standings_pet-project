import "./styles/index.css";
import { currentSeasonData, getResultRace } from "./api.js";
import { createSheduleTable } from "./renderShedule.js";
import { dataConstructorChart } from "./lineChartConstStandings.js";
import { dataDriverChart } from "./lineChartDrivertStandings.js";
import { renderWinnersPopup } from "./renderWinnersPopup.js";
import {
  currentYear,
  getDataOfNearestGrandPrix,
  getDataOfLastGrandPrix,
} from "./utils.js";
import { renderDataNearestGrandPrix } from "./renderDataNearestGP.js";

// Глобальные константы
const scheduleTable = document.querySelector(".schedule_table"); // сводная таблица с информацией о гран-при сезона

// Глобальные константы попапа с результатами гонки, которую выбрал пользователь
const resultPopup = document.querySelector(".res_popup_wrapper");
const resultPopupImage = document.querySelector(".res_popup_image");
const resultPopupName = document.querySelector(".res_popup_grand_prix_name");
const resultPopupFirstPlace = document.querySelector(".res_popup_first_place");
const resultPopupSecPlace = document.querySelector(".res_popup_sec_place");
const resultPopupThirdPlace = document.querySelector(".res_popup_third_place");
const closeResultPopupBtn = document.querySelector(".res_popup_close_btn");

// Глобальные константы модульного окна с результатами последней гонки
const resultModuleImage = document.querySelector(".result_image");
const resultModuleName = document.querySelector(".result_grand_prix_name");
const resultModuleFirstPlace = document.querySelector(".result_first_place");
const resultModuleSecPlace = document.querySelector(".result_sec_place");
const resultModuleThirdPlace = document.querySelector(".result_third_place");

//  Глобальные константы окна с инфой о следующем гран-при
const nextGranPrixModuleName = document.querySelector(".next_race_data_name");
const nextGranPrixModuleTime = document.querySelector(".next_race_data_time");

// Инициализация сводной таблицы по текущему сезону
createSheduleTable(scheduleTable, currentSeasonData);

// Инициализация графиков
const ctxConstructor = document
  .getElementById("constructorStandingsChart")
  .getContext("2d");
const constructorChart = new Chart(ctxConstructor, dataConstructorChart);

const ctxDriver = document
  .getElementById("driverStandingsChart")
  .getContext("2d");
const driverChart = new Chart(ctxDriver, dataDriverChart);

// Слушатель событий для обработчика клика по результатам гран-при
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("active_popup")) {
    renderWinnersPopup(
      currentYear,
      evt.target.id,
      resultPopupImage,
      resultPopupName,
      resultPopupFirstPlace,
      resultPopupSecPlace,
      resultPopupThirdPlace,
      closeResultPopupBtn
    );
    resultPopup.classList.add("open");
  }
});

// запуск функции рендера модульного окна с инфой о прошедшей гонке
renderWinnersPopup(
  currentYear,
  getDataOfLastGrandPrix(currentSeasonData).round,
  resultModuleImage,
  resultModuleName,
  resultModuleFirstPlace,
  resultModuleSecPlace,
  resultModuleThirdPlace
);

// запуск функций определения ближайшего гран-при и рендера окна с информацией о нем
const nearestGrandPrix = getDataOfNearestGrandPrix(currentSeasonData);
renderDataNearestGrandPrix(
  nearestGrandPrix,
  nextGranPrixModuleName,
  nextGranPrixModuleTime
);

// функция открытия бургер-меню для телефонов
document
  .querySelector(".header_burger_menu_btn")
  .addEventListener("click", function () {
    const navList = document.querySelector(".header_nav_list");
    navList.classList.toggle("active");
  });
