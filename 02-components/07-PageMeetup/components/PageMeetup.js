import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from './MeetupView';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      required: true,
      type: Number,
    },
  },

  data() {
    return {
      currentMeetup: null,
      isLoading: false,
      errors: [],
    };
  },

  watch: {
    meetupId: {
      handler(newValue, oldValue) {
        this.errors = [];
        this.isLoading = true;
        fetchMeetupById(newValue)
          .then((data) => {
            this.currentMeetup = data;
            this.isLoading = false;
          })
          .catch(e => {
            console.warn(e);
            this.currentMeetup = null;
            this.isLoading = false;
            this.errors.push('Test Error');
          });
      },
      immediate: true,
    },
  },

  template: `
    <div class='page-meetup'>
    <MeetupView v-if='currentMeetup && !isLoading' :meetup='currentMeetup' />

    <UiContainer v-if='isLoading'>
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>

    <UiContainer v-if='errors.length > 0'>
      <UiAlert v-for='item in errors'>{{ item }}</UiAlert>
    </UiContainer>
    </div>`,
});
