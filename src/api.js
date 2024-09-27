// Функция для подготовки данных по текущему сезону (этапы, даты проведения и т.д.)
export async function getCurrentSeasonInfo() {
  try {
    const res = await fetch("http://ergast.com/api/f1/current.json");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result = await res.json();
    return result.MRData.RaceTable.Races;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

// Функция для подготовки данных о зачете конструкторов или пилотов после конкретного раунда в конкретном сезоне
export async function getStandigs(year, round, type) {
  try {
    const res = await fetch(
      `http://ergast.com/api/f1/${year}/${round}/${type}Standings.json`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result = await res.json();
    if (type === "constructor") {
      return result.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings;
    }
    if (type === "driver") {
      return result.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

// Функция получения результатов конкретной гонки
export async function getResultRace(year, round) {
  try {
    const res = await fetch(
      `http://ergast.com/api/f1/${year}/${round}/results.json`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result = await res.json();
    return result.MRData.RaceTable.Races[0];
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

// экспортируем сводные данные по текущему сезону
export const currentSeasonData = await getCurrentSeasonInfo();
