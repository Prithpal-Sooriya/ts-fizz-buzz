/**
 * Fizz Buzz Type Annotations
 *
 * We want to pass in an array and returns an array that:
 *   Replaces numbers divisible by X to `Fizz`
 *   Replaces numbers divisible by Y to 'Buzz'
 *   Replaces numbers divisible by X & Y to 'FizzBuzz'
 *   If not divisible, then return that number
 */

import type { IsDivisibleBy2, IsDivisibleBy3, IsDivisibleBy5 } from './divisibilityRules'

// This is to remove the number at end of recursive concatenation in FizzBuzz below.
// E.g. Fizz4, Fizz2, ...
type ConvertConcatNumberToEmptyString<Str extends string | number, T extends number> =
  `${Str}` extends `${infer Rest}${T}` ? Rest : Str

// Helper type to abstract the recursion & conversion
type ConcatBuzz<T extends number, BuzzPredicate> = ConvertConcatNumberToEmptyString<FizzBuzz<T, null, BuzzPredicate>, T>

/* Fizz Buzz type used for single number */
export type FizzBuzz<T extends number, FizzPredicate = IsDivisibleBy2<T>, BuzzPredicate = IsDivisibleBy5<T>> =
  FizzPredicate extends true ? `Fizz${ConcatBuzz<T, BuzzPredicate>}` :
  BuzzPredicate extends true ? `Buzz` :
  T

/* Fizz Buzz type used for an array of numbers */
// Swap the divisibility rules in this CalculateFizzBuzz adapter to try different rules
type CalculateFizzBuzz<T extends number> = FizzBuzz<T, IsDivisibleBy3<T>, IsDivisibleBy5<T>>
// type CalculateFizzBuzz<T extends number> = FizzBuzz<T, IsDivisibleBy2<T>, IsDivisibleBy5<T>>
export type FizzBuzzArray<Arr extends number[]> = {
  [K in keyof Arr]: CalculateFizzBuzz<Arr[K] & number>
}

type InputArray = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
  50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
  70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
  90, 91, 92, 93, 94, 95, 96, 97, 98, 99
];

// With Fizz = 3, Buzz = 5. Expected: ["FizzBuzz", 1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", ...]
type ExpectedFizzBuzz = FizzBuzzArray<InputArray>


/* -- Fizz Buzz Bazz -- */
// Extending FizzBuzz to take 3 predicates

// Helper types to abstract recursion
type ConcatBuzzBazz<T extends number, BuzzPredicate, BazzPredicate> = ConvertConcatNumberToEmptyString<
  FizzBuzzBazz<T, null, BuzzPredicate, BazzPredicate>,
  T
>
type ConcatBazz<T extends number, BazzPredicate> = ConvertConcatNumberToEmptyString<
  FizzBuzzBazz<T, null, null, BazzPredicate>,
  T
>

export type FizzBuzzBazz<
  T extends number,
  FizzPredicate = IsDivisibleBy2<T>,
  BuzzPredicate = IsDivisibleBy3<T>,
  BazzPredicate = IsDivisibleBy5<T>
  > =
  FizzPredicate extends true ? `Fizz${ConcatBuzzBazz<T, BuzzPredicate, BazzPredicate>}` :
  BuzzPredicate extends true ? `Buzz${ConcatBazz<T, BazzPredicate>}` :
  BazzPredicate extends true ? `Bazz` :
  T;

type CalculateFizzBuzzBazz<T extends number> = FizzBuzzBazz<T, IsDivisibleBy2<T>, IsDivisibleBy3<T>, IsDivisibleBy5<T>>
export type FizzBuzzBazzArray<Arr extends number[]> = {
  [K in keyof Arr]: CalculateFizzBuzzBazz<Arr[K] & number>
}

// With Fizz = 2, Buzz = 3, Bazz = 5. Expected: ["FizzBuzzBazz", 1, "Fizz", "Buzz", "Fizz", "Bazz", "FizzBuzz", 7, "Fizz", "Buzz", "FizzBazz", ...]
type ExpectedFizzBuzzBazz = FizzBuzzBazzArray<InputArray>