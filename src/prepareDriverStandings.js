import { defineCurrentRound } from "./utils.js";
import { getStandigs } from "./api.js";

// Функция добавления в объект с данными по очкам пилотов для конкретной гонки
async function prepareDriverStandingsDataForRace(year, round) {
  const arrStandingsData = await getStandigs(year, round, "driver");
  const raceData = {};

  arrStandingsData.forEach((driverData) => {
    raceData[driverData.Driver.driverId] = +driverData.points;
  });

  return { round, raceData };
}

// Функция создания объекта с данными по очкам кубка пилотов и вызова функции для его наполнения данными по каждому прошедшему гран-при
async function prepareAllDriverStandingsData(year, quantityRounds) {
  const promises = [];

  for (let round = 1; round <= quantityRounds; round++) {
    promises.push(prepareDriverStandingsDataForRace(year, round));
  }

  const standingsArray = await Promise.all(promises);

  const driverStandingsData = standingsArray.reduce(
    (acc, { round, raceData }) => {
      acc[round] = raceData;
      return acc;
    },
    {}
  );

  return driverStandingsData;
}

// Функция инициализации подготовки данных кубка пилотов по каждой гонке за текущий сезон
export async function initializePreparingDriverStandingsData(
  currentYear,
  currentSeasonData
) {
  const currentRound = defineCurrentRound(currentSeasonData);

  if (currentRound !== undefined) {
    const driverStandingsData = await prepareAllDriverStandingsData(
      currentYear,
      currentRound
    );
    return driverStandingsData;
  } else {
    console.error("Ошибка: lastRoundNumber не был инициализирован");
  }
}
