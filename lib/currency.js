import { getLocale } from './client/options';

/**
 * Format currency
 * @param {Number} value
 * @param {Object} options
 * @returns {String}
 */
export function formatC (value, options) {
  if (value == null) {
    return value;
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  options = options || {};

  var _localeOptions = getLocale(options.locale);
  var _precision     = options.precision || _localeOptions.precision;
  var _currency      = options.currency  || options.source || _localeOptions.currency;
  var _locale        = options.locale    || _localeOptions.locale;

  // If options target is defined, we need to convert
  if (options.target && options.rates && options.rates[options.target]) {
    options.source = _currency;
    _currency      = options.target;
    value          = convC(value, options);
  }

  return {
    locale    : _locale,
    currency  : _currency,
    precision : _precision,
    value     : value
  };
}

/**
 * Convert currency
 * @param {Number} value
 * @param {Object} options
 * @returns {Number}
 */
export function convC (value, options) {
  if (value == null) {
    return value;
  }

  if (typeof value === 'string' && isNaN(value)) {
    return '-';
  }

  options = options || {};

  var _localeOptions = getLocale(options.locale);
  var _source        = options.source || _localeOptions.currency;
  var _target        = options.target;
  var _rates         = options.rates;

  if (!_target || !_rates || (_rates && !_rates[_source]) || (_rates && !_rates[_target])) {
    return value;
  }

  var _value = value / _rates[_source];
  return _value * _rates[_target];
}