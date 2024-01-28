import { computed } from 'vue';

export function useMeetupsByDate(meetups) {

  const filterMeetups = computed(() => {
    const obj = {};
    meetups.forEach(item => {
      obj[item.date] ? obj[item.date].push(item) : obj[item.date] = [item]
    })
    return obj
  })

  return {
    filterMeetups
  }
}
