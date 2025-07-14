/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import { allPass } from './validators.js';

const api = new Api();

const isLengthValid = str => str.length > 2 && str.length < 10;
const isPositive = str => parseFloat(str) > 0;
const isDecimal = str => /^[0-9.]+$/.test(str);

const isValid = () => allPass([isLengthValid, isPositive, isDecimal])

const round = Math.round;
const square = x => x * x;
const mod3 = x => x % 3;

const convertToNumber = parseFloat;

const logAndPass = writeLog => value => {
  writeLog(value);
  return value;
};

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const log = logAndPass(writeLog);

  if (!isValid(value)) {
    return handleError('ValidationError');
  }

  const number = log(round(convertToNumber(value)));

  api.get('https://api.tech/numbers/base', {
    number,
    from: 10,
    to: 2,
  })
    .then(({ result }) => log(result))
    .then(binaryStr => log(binaryStr.length))
    .then(length => log(square(length)))
    .then(squared => log(mod3(squared)))
    .then(id => api.get(`https://animals.tech/${id}`)({}))
    .then(({ result }) => handleSuccess(result))
    .catch(handleError);
};

export default processSequence;
