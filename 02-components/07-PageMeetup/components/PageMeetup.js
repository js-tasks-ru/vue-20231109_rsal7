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
      error: '',
    };
  },

  watch: {
    meetupId: {
      handler(newValue, oldValue) {
        this.error = '';
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
            this.error = e.message;
          });
      },
      immediate: true,
    },
    computed: {

    }
  },

  template: `
    <div class='page-meetup'>
    <MeetupView v-if='currentMeetup && !isLoading && !error' :meetup='currentMeetup' />

    <UiContainer v-if='isLoading'>
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>

    <UiContainer v-if='error'>
      <UiAlert >{{ error }}</UiAlert>
    </UiContainer>
    </div>`,
});
