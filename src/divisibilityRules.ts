/* These are the rules we use to check to see if a number is divisible by a certain number. */

// For some numbers we can use the Divisibility Rules to check if a number is divisible.
// https://en.wikipedia.org/wiki/Divisibility_rule

// 5 Divisibility rule, we only need to look at last digit & see if it is a 0 or 5.
export type IsDivisibleBy5<T extends number> = `${T}` extends `${infer OtherDigits}${0 | 5}` ? true : false;

// 2 Divisibility rule, we only need to look at last digit & see if it is a 0, 2, 4, 6 or 8
export type IsDivisibleBy2<T extends number> = `${T}` extends `${infer OtherDigits}${0 | 2 | 4 | 6 | 8}` ? true : false;

// Unsure if it is possible to generate a 3 Divisibility rule using current version of Typescript
type Finite3Tuple = [
  0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33,
  36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66,
  69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99
]
export type IsDivisibleBy3<T extends number> = T extends Finite3Tuple[number] ? true : false;