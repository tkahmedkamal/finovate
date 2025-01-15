const geTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export default geTimezone;
