import { pinColors } from "./picsnicx-constants.js";
import itinerary from './itinerary.json';

export function getPinColor(index) {
    return pinColors[index];
}

export function getStartCoordinates(currentDay) {
    return [itinerary[currentDay][0].coordinates[0], itinerary[currentDay][0].coordinates[1]];
}

export function getStartLocationCoordinates(currentDay) {
    return itinerary[currentDay][0].coordinates;
}

export function getNextLocationCoordinates(currentDay, index) {
    return itinerary[currentDay][index - 2].coordinates;
}

export function getNextRoutePoints(currentDay, index) {
    return `${itinerary[currentDay][index - 2].coordinates[0]},${
        itinerary[currentDay][index - 2].coordinates[1]
      };${itinerary[currentDay][index - 1].coordinates[0]},${
        itinerary[currentDay][index - 1].coordinates[1]
      }`;
}