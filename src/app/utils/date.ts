export const MS_PER_MINUTE = 60000;

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT_DISPLAY = 'DD.MM.YYYY';

export const getNowTime = (add?: number) => {
  let now = new Date();

  if (add) {
    now = new Date(now.getTime() + add * MS_PER_MINUTE);
  }

  let hours: any = now.getHours();
  hours = hours < 10 ? '0' + hours : hours;

  let minutes: any = now.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes;
};
