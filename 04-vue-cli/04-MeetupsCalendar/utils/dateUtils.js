export function getIndex(index){
  return index === 0 ? 6 : index - 1;
}

export function getDaysInMonth(date){
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function convertDateToUTC(timestamp){
  const offset = new Date().getTimezoneOffset();
  return timestamp - (offset * 60 * 1000);
}
