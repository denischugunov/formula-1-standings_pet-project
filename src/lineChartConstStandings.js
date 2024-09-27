import { initializePreparingConstStandingsData } from "./prepareConstructorStandings.js";
import { currentSeasonData } from "./api.js";
import { getRandomColor, currentYear } from "./utils.js";

// Подготовка объекта с данными для каждой прошедшей гонки сезона с очками команд
const standingsTeamData = await initializePreparingConstStandingsData(
  currentYear,
  currentSeasonData
);

// Обработка данных для инъекции в график с зачетом кубка конструкторов
const firstEntry = Object.values(standingsTeamData)[0]; // Берем первый элемент объекта
const dataKeys = Object.keys(firstEntry); // Получаем ключи (названия линий)

const labels = currentSeasonData.map(
  (race, index) => currentSeasonData[index].Circuit.circuitId
);

const datasets = dataKeys.map((key) => {
  return {
    label: key, // Название линии
    data: Object.values(standingsTeamData).map((item) => item[key]), // Данные для каждой линии
    borderColor: getColor(key),
    borderWidth: 2,
    fill: false,
  };
});

function getColor(constructor) {
  switch (constructor) {
    case "red_bull":
      return "rgba(30, 34, 66, 1)";
    case "mercedes":
      return "rgba(0, 210, 190, 1)";
    case "ferrari":
      return "rgba(220, 0, 0, 1)";
    case "mclaren":
      return "rgba(255, 135, 0, 1)";
    case "aston_martin":
      return "rgba(0, 111, 98, 1)";
    case "alpine":
      return "rgba(0, 115, 207, 1)";
    case "haas":
      return "rgba(200, 16, 46, 1)";
    case "williams":
      return "rgba(0, 82, 155, 1)";
    case "sauber":
      return "rgba(173, 255, 47, 1)";
    case "rb":
      return "rgba(23, 41, 77, 1)";
    default:
      return getRandomColor();
  }
}

export const dataConstructorChart = {
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
