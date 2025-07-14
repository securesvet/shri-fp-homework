/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

export function allPass(predicates) {
  return function (...args) {
    return predicates.every(predicate => predicate(...args));
  };
}

function anyPass(predicates) {
  return function (...args) {
    return predicates.some(predicate => predicate(...args));
  };
}

const isShapeGreen = (shape) => shape === "green";
const isShapeRed = (shape) => shape === "red";
const isShapeBlue = (shape) => shape === "blue";
const isShapeOrange = (shape) => shape === "orange";
const isShapeWhite = (shape) => shape === "white";
const amountFilter = (shapes) => (predicate) => Object.values(shapes).filter(predicate).length
const isEqual = (a, b) => a === b;
const shapesFilter = (shapes) => (predicate) => shapes.filter(predicate);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
  if (triangle !== 'white' || circle !== 'white') {
    return false;
  }

  return star === 'red' && square === 'green';
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => {
  const greenShapesAmount = amountFilter(shapes)(isShapeGreen);
  return greenShapesAmount >= 2;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => {
  const amountOfShapesFilter = amountFilter(shapes)
  const amountOfBlueShapes = amountOfShapesFilter(isShapeBlue)
  const amountOfRedShapes = amountOfShapesFilter(isShapeRed)
  return amountOfBlueShapes === amountOfRedShapes
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (shapes) => {
  const { circle, star, square } = shapes;
  return allPass([() => isShapeBlue(circle), () => isShapeRed(star), () => isShapeOrange(square)])();
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) => {
  const isShapeNotWhiteAndPredicate = p => (s) => p(s) && !isShapeWhite(s);
  const arrayOfPredicates = [isShapeGreen, isShapeRed, isShapeBlue, isShapeOrange];
  const arrayOfPredicatesNotWhite = arrayOfPredicates.map(p => isShapeNotWhiteAndPredicate(p))
  const shapesFilterInitialized = shapesFilter(Object.values(shapes))
  const arrayOfAmounts = arrayOfPredicatesNotWhite.map(predicate => shapesFilterInitialized(predicate).length);
  console.log(arrayOfAmounts)
  return Math.max(...arrayOfAmounts) >= 3;
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (shapes) => {
  const { triangle } = shapes;
  const amountOfShapesFilter = amountFilter(shapes)
  const amountOfGreenShapes = amountOfShapesFilter(isShapeGreen)
  const amountOfRedShapes = amountOfShapesFilter(isShapeRed)
  return isEqual(amountOfGreenShapes, 2) && isShapeGreen(triangle) && isEqual(amountOfRedShapes, 1)
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (shapes) => {
  const amountOfShapesFilter = amountFilter(shapes)
  const amountOfOrangeShapes = amountOfShapesFilter(isShapeOrange)
  return isEqual(amountOfOrangeShapes, Object.values(shapes).length);
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (shapes) => {
  const { star } = shapes;
  return !isShapeRed(star) && !isShapeRed(star)
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => {
  const amountOfShapesFilter = amountFilter(shapes)
  const amountOfGreenShapes = amountOfShapesFilter(isShapeGreen)
  return isEqual(amountOfGreenShapes, Object.values(shapes).length);
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (shapes) => {
  const isShapeAnyOtherThanWhite = s => s !== "white";
  const { triangle, square } = shapes;
  return isEqual(triangle, square) && isShapeAnyOtherThanWhite(triangle);
};
