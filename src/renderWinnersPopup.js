import { getResultRace } from "./api.js";

// Импортируем все изображения
import SAI from "./images/drivers/SAI.png";
import LEC from "./images/drivers/LEC.png";
import VER from "./images/drivers/VER.png";
import PER from "./images/drivers/PER.png";
import RUS from "./images/drivers/RUS.png";
import HAM from "./images/drivers/HAM.png";
import NOR from "./images/drivers/NOR.png";
import PIA from "./images/drivers/PIA.png";
import ANY from "./images/drivers/ANY.png";

export async function renderWinnersPopup(
  year,
  round,
  image,
  name,
  firstPl,
  secPl,
  thirdPl,
  closeBtn
) {
  const raceResult = await getResultRace(year, round);

  image.src = getWinnerImage(raceResult.Results[0].Driver.code);
  name.textContent = raceResult.raceName;
  firstPl.textContent = `1. ${raceResult.Results[0].Driver.givenName} ${raceResult.Results[0].Driver.familyName}, ${raceResult.Results[0].Constructor.constructorId}`;
  secPl.textContent = `2. ${raceResult.Results[1].Driver.givenName} ${raceResult.Results[1].Driver.familyName}, ${raceResult.Results[1].Constructor.constructorId}`;
  thirdPl.textContent = `3. ${raceResult.Results[2].Driver.givenName} ${raceResult.Results[2].Driver.familyName}, ${raceResult.Results[2].Constructor.constructorId}`;
  if (closeBtn) {
    document.addEventListener("click", closePopup);
    document.addEventListener("keydown", closePopupByKeyboard);
  }
}

function closePopup(evt) {
  if (evt.target.classList.contains("res_popup_close_btn")) {
    const popup = evt.target.closest(".res_popup_wrapper");
    popup.classList.remove("open");
    document.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", closePopupByKeyboard);
  } else if (!evt.target.closest(".res_popup")) {
    const popup = evt.target.closest(".res_popup_wrapper");
    popup.classList.remove("open");
    document.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", closePopupByKeyboard);
  }
}

function closePopupByKeyboard(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".res_popup_wrapper");
    popup.classList.remove("open");
    document.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", closePopupByKeyboard);
  }
}

function getWinnerImage(winnerId) {
  const images = {
    SAI: SAI,
    LEC: LEC,
    VER: VER,
    PER: PER,
    RUS: RUS,
    HAM: HAM,
    NOR: NOR,
    PIA: PIA,
  };

  return images[winnerId] || ANY;
}
