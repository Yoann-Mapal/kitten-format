import { getLocale } from './client/options';

/**
 * Format number
 * @param {Number} value
 * @param {Object} options
 * @return {String}
 */
export function formatN (value, options) {
  if (value == null) {
    return value
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  options = options || {};

  var _localeOptions = getLocale(options.locale);
  var _precision     = options.precision || _localeOptions.precision;
  var _locale        = options.locale    || _localeOptions.locale;

  return {
    locale    : _locale,
    precision : _precision
  }
}

/**
 * Average a number
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
export function averageN (value, options) {
  if (value == null) {
    return value;
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  options = options || {};

  var _power = options.power === null || options.power === undefined ? 0 : options.power;
  var _unit  = options.unit;

  if (!_unit) {
    return value;
  }

  var _value        = value;
  var _averagePower = 0;
  var _displayPower = null;

  if (value >= 1) {
    var _valueStr    = (value + '').split('.')[0];
    var _valueLength = _valueStr.length;
    _averagePower    = Math.trunc(_valueLength / 3) * 3;

    if ((options.maxPower !== null && options.maxPower !== undefined) && _averagePower + _power > options.maxPower) {
      _displayPower = options.maxPower - _power;
    }

    _value = value * Math.pow(10, -(_displayPower !== null ?_displayPower : _averagePower));
  }

  if (_value < 1) {
    _value = _value * Math.pow(10, 3);
    _power -= 3;

    if (_power === -0) {
      _power = 0;
    }
  }

  var _localeOptions = getLocale(options.locale);
  var _unitPrefixes  = _localeOptions.unitPrefixes;
  var _unitPrefix = _unitPrefixes[(_displayPower !== null ? _displayPower : _averagePower) + _power];

  if (_unitPrefix === undefined) {
    _unitPrefix = '10^' + (_averagePower + _power) + _unit;
  }
  else if (typeof _unitPrefix !== 'string') {
    _unitPrefix = _unitPrefix[_unit] || _unitPrefix.default;
  }
  else {
    _unitPrefix += _unit;
  }

  return {
    value : _value,
    unit  : _unitPrefix
  }
}

/**
 * Set a number as a percentage
 * @param {Number} value
 */
export function percent (value) {
  if (value == null) {
    return value;
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  var _value = value * 100;

  if (value > 1) {
    _value = value;
  }

  return {
    value : _value
  };
}