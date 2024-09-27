import { defineCurrentRound } from "./utils.js";
import { getStandigs } from "./api.js";

// Функция добавления в объект с данными по очкам кубка конструкторов для конкретной гонки
async function prepareConstructorStandingsDataForRace(year, round) {
  const arrStandingsData = await getStandigs(year, round, "constructor");
  const raceData = {};

  arrStandingsData.forEach((constructorData) => {
    raceData[constructorData.Constructor.constructorId] =
      +constructorData.points;
  });

  return { round, raceData };
}

// Функция создания объекта с данными по очкам кубка конструкторов и вызова функции для его наполнения данными по каждому прошедшему гран-при
async function prepareAllConstructorStandingsData(year, quantityRounds) {
  const promises = [];

  for (let round = 1; round <= quantityRounds; round++) {
    promises.push(prepareConstructorStandingsDataForRace(year, round));
  }

  const standingsArray = await Promise.all(promises);

  const constructorStandingsData = standingsArray.reduce(
    (acc, { round, raceData }) => {
      acc[round] = raceData;
      return acc;
    },
    {}
  );
  return constructorStandingsData;
}

// Функция инициализации подготовки данных кубка конструктора по каждой гонке за текущий сезон
export async function initializePreparingConstStandingsData(
  currentYear,
  currentSeasonData
) {
  const currentRound = defineCurrentRound(currentSeasonData);

  if (currentRound !== undefined) {
    const constructorStandingsData = await prepareAllConstructorStandingsData(
      currentYear,
      currentRound
    );
    return constructorStandingsData;
  } else {
    console.error("Ошибка: lastRoundNumber не был инициализирован");
  }
}
