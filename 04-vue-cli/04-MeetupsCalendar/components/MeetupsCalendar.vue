<template>
  <div class='calendar-view'>
    <div class='calendar-view__controls'>
      <div class='calendar-view__controls-inner'>
        <button
          class='calendar-view__control-left'
          type='button'
          aria-label='Previous month'
          @click='decrementMonth'
        ></button>
        <div class='calendar-view__date'>{{ currentMonthToString }}</div>
        <button
          class='calendar-view__control-right'
          type='button'
          aria-label='Next month'
          @click='incrementMonth'
        ></button>
      </div>
    </div>

    <div class='calendar-view__grid'>
      <MeetupsCalendarItem
        v-for='item in filterCells'
        :cell='item'
        :key='item.timeStamp'
        class='calendar-view__cell'
        :class='{"calendar-view__cell_inactive": !item.isCurrentMonth}'
        tabindex='0'
      />
    </div>
  </div>
</template>

<script setup>

import { computed, ref } from 'vue';
import { useMeetupsByDate } from '../composable/useMeetupsByDate';
import { useFilterCells } from '../composable/useFilterCells';
import MeetupsCalendarItem from './MeetupsCalendarItem.vue';

const props = defineProps({
  meetups: {
    type: Array,
    required: true,
  },
});

const currentDate = ref(new Date());

const incrementMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

const decrementMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};


const currentMonthToString = computed(() => {
  return currentDate.value.toLocaleDateString(navigator.language, {
    month: 'long',
    year: 'numeric',
  });
});
const filterMeetups = computed(() => {
  const obj = {};
  props.meetups.forEach(item => {
    obj[item.date] ? obj[item.date].push(item) : obj[item.date] = [item];
  });
  return obj;
});

// const { filterMeetups } = useMeetupsByDate(props.meetups);

const { filterCells } = useFilterCells(currentDate, filterMeetups);

</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}


</style>
