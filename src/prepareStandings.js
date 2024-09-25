import { defineCurrentRound } from './utils.js'
import { getCurrentSeasonInfo, getConstructorStandigs } from './api.js'


// Функция добавления в объект с данными по очкам кубка конструкторов для конкретной гонки
async function prepareConstructorStandingsDataForRace(
    year,
    round,
    constructorStandingsData
  ) {
    const arrStandingsData = await getConstructorStandigs(year, round);
    constructorStandingsData[round] = {};
  
    arrStandingsData.forEach((constructorData) => {
      constructorStandingsData[round][constructorData.Constructor.constructorId] =
        +constructorData.points;
    });
    return constructorStandingsData;
  }
  
  // Функция создания объекта с данными по очкам кубка конструкторов и вызова функции для его наполнения данными по каждому прошедшему гран-при
  async function prepareAllConstructorStandingsData(year, quantityRounds) {
    let constructorStandingsData = {};
    for (let round = 1; round <= quantityRounds; round++) {
      constructorStandingsData = await prepareConstructorStandingsDataForRace(
        year,
        round,
        constructorStandingsData
      );
    }
    return constructorStandingsData;
  }
  
  // Функция инициализации подготовки данных кубка конструктора по каждой гонке за текущий сезон
  export async function initializePreparingStandingsData(currentYear, currentSeasonData) {
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