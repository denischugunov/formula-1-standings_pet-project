import { initializePreparingDriverStandingsData } from "./prepareDriverStandings.js";
import { currentSeasonData } from "./api.js";
import { getRandomColor, currentYear } from "./utils.js";

// Подготовка объекта с данными для каждой прошедшей гонки сезона с очками пилотов
const standingsDriverData = await initializePreparingDriverStandingsData(
  currentYear,
  currentSeasonData
);

// Обработка данных для инъекции в график с зачетом пилотов
const firstEntry = Object.values(standingsDriverData)[0]; // Берем первый элемент объекта
const dataKeys = Object.keys(firstEntry); // Получаем ключи (названия линий)

const labels = currentSeasonData.map(
  (race, index) => currentSeasonData[index].Circuit.circuitId
);

const datasets = dataKeys.map((key) => {
  return {
    label: key, // Название линии
    data: Object.values(standingsDriverData).map((item) => item[key]), // Данные для каждой линии
    borderColor: getColor(key),
    borderWidth: 2,
    fill: false,
  };
});

function getColor(driver) {
  switch (driver) {
    case "max_verstappen":
    case "perez":
      return "rgba(30, 34, 66, 1)";
    case "hamilton":
    case "russell":
      return "rgba(0, 210, 190, 1)";
    case "leclerc":
    case "sainz":
      return "rgba(220, 0, 0, 1)";
    case "norris":
    case "piastri":
      return "rgba(255, 135, 0, 1)";
    case "alonso":
    case "stroll":
      return "rgba(0, 111, 98, 1)";
    case "gasly":
    case "ocon":
      return "rgba(0, 115, 207, 1)";
    case "hulkenberg":
    case "kevin_magnussen":
      return "rgba(200, 16, 46, 1)";
    case "albon":
    case "sargeant":
      return "rgba(0, 82, 155, 1)";
    case "bottas":
    case "zhou":
      return "rgba(173, 255, 47, 1)";
    case "ricciardo":
    case "tsunoda":
      return "rgba(23, 41, 77, 1)";
    default:
      return getRandomColor();
  }
}

export const dataDriverChart = {
  type: "line",
  data: {
    labels: labels,
    datasets: datasets,
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
