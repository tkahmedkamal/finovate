import { timeZoneCurrencies } from '../constants';
import { TimeZoneCurrencies } from '../types';

const timeZoneToCurrency = (timezone: TimeZoneCurrencies) => {
  return timeZoneCurrencies[timezone] ?? timeZoneCurrencies['Africa/Cairo'];
};

export default timeZoneToCurrency;
