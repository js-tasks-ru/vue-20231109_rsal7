<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click='$emit("remove")'>
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown
        title="Тип"
        :options="$options.agendaItemTypeOptions"
        name="type"
        v-model='localAgendaItem.type'
      />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput
            type="time"
            placeholder="00:00"
            name="startsAt"
            v-model='localAgendaItem.startsAt'

          />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput
            type="time"
            placeholder="00:00"
            name="endsAt"
            v-model='localAgendaItem.endsAt'

          />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup :label="currentType.title" v-if='currentType.hasOwnProperty("title")'>
      <UiInput
        name="title"
        v-model="localAgendaItem.title"
      />
    </UiFormGroup>
    <UiFormGroup :label="currentType.speaker" v-if='currentType.hasOwnProperty("speaker")'>
      <UiInput
        name="speaker"
        v-model="localAgendaItem.speaker"
      />
    </UiFormGroup>
    <UiFormGroup :label="currentType.description" v-if='currentType.hasOwnProperty("description")'>
      <UiInput
        multiline
        name="description"
        v-model="localAgendaItem.description"
      />
    </UiFormGroup>
    <UiFormGroup :label="currentType.language" v-if='currentType.hasOwnProperty("language")'>
      <UiDropdown
        title="Язык"
        :options="$options.talkLanguageOptions"
        name="language"
        v-model='localAgendaItem.language'
      />
    </UiFormGroup>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];
const dateDiff = function(start, end) {
  return getDateFromStr(end) - getDateFromStr(start);
}
const getDateFromStr = function(str){
  return new Date().setHours(str.split(':')[0], str.split(':')[1])
}
const getStringDateFromInt = function(number){
  const addZero = function(number){
    return +number < 10 ? `0${number}` : `${number}`
  }
  const date = new Date(number);
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
}

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      period: dateDiff(this.agendaItem.startsAt, this.agendaItem.endsAt),
      itemTitles: {
        talk: {
          title: 'Тема',
          speaker: 'Докладчик',
          description: 'Описание',
          language: 'Язык'
        },
        other: {
          title: 'Заголовок',
          description: 'Описание'
        },
        notYet: {
          title: "Нестандартный текст (необязательно)"
        }

      }
    };
  },
  computed: {
    currentType(){
      if(this.itemTitles.hasOwnProperty(this.localAgendaItem.type)){
        return this.itemTitles[this.localAgendaItem.type]
      }
      return this.itemTitles['notYet'];
    },
  },
  emits: ['update:agendaItem','remove'],

  watch: {
    localAgendaItem: {
      deep: true,
      handler(){
        if(this.agendaItem.endsAt !== this.localAgendaItem.endsAt){
          this.period = dateDiff(this.localAgendaItem.startsAt, this.localAgendaItem.endsAt);
        }
        if(this.agendaItem.startsAt !== this.localAgendaItem.startsAt){
          this.localAgendaItem.endsAt = getStringDateFromInt(getDateFromStr(this.localAgendaItem.startsAt) + this.period);
        }
        this.$emit('update:agendaItem', { ...this.localAgendaItem });
      }
    },
  }
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
