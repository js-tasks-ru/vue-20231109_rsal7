import { computed } from 'vue';

export function useFilterCells(currentDate, filterMeetups) {
  const getIndex = (index) => {
    return index === 0 ? 6 : index - 1;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const convertDateToUTC = (timestamp) => {
    const offset = new Date().getTimezoneOffset();
    return timestamp - (offset * 60 * 1000);
  };

  const startMonthDay = computed(() => {
    return new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1);
  });

  const filterCells = computed(() => {
    const startDate = new Date(startMonthDay.value.getTime() - 24 * 3600 * 1000 * getIndex(startMonthDay.value.getDay()));
    const cellsArray = [];

    for (let i = 0; i < 42; i++) {
      const newDate = new Date(startDate.getTime() + 24 * 3600 * 1000 * i);
      cellsArray[i] = {
        date: newDate,
        timeStamp: newDate.getTime(),
        isCurrentMonth: newDate.getMonth() === currentDate.value.getMonth(),
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
        day: newDate.getDate(),
        weekDay: newDate.getDay(),
        meetups: filterMeetups.value[convertDateToUTC(newDate.getTime())],
      };
      if (cellsArray[i].weekDay === 0) {
        if (!cellsArray[i].isCurrentMonth || cellsArray[i].day === getDaysInMonth(newDate)) {
          break;
        }
      }
    }
    return cellsArray;
  });

  return {
    filterCells,
  };
}
