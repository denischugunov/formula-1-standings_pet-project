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
  
  // Функция для подготовки данных о зачете конструкторов после конкретного раунда в конкретном сезоне
  export async function getConstructorStandigs(year, round) {
    try {
      const res = await fetch(
        `http://ergast.com/api/f1/${year}/${round}/constructorStandings.json`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      return result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }