import { getDayOfYear } from "date-fns";
import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

 

 test('increases date with one year', () => {
    const year = new Date().getFullYear()

    expect(getFutureDate(`${year}-02-01`).getFullYear()).toEqual(2024)
 } )
