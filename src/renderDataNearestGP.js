import { getDayLabel } from "./utils.js";

export function renderDataNearestGrandPrix(
  nearestGrandPrix,
  grandPrixNameField,
  grandrixTimeField
) {
  const timeForGrandPrix = getTimeForNextGrandPrix(nearestGrandPrix);

  grandPrixNameField.textContent = `Следующий Гран-при: ${nearestGrandPrix.raceName}`;
  grandrixTimeField.textContent = `Осталось: ${getDayLabel(timeForGrandPrix)}`;
}

export function getTimeForNextGrandPrix(nearestGrandPrix) {
  const date1 = new Date();
  const date2 = new Date(nearestGrandPrix.date);

  const differenceInTime = date2 - date1;
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return Math.ceil(differenceInDays);
}
