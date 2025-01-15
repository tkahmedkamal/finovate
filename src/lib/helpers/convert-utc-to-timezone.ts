const convertUTCToTimezone = (utcDate: Date, timeZone: string) => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return formatter.format(utcDate);
};

export default convertUTCToTimezone;
