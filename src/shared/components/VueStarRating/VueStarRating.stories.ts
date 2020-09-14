import { storiesOf } from "@storybook/vue";
import VueStarRating from "./VueStarRating.vue";

const story = storiesOf("Organisms|StarRating", module) as any;

story.add(
  "Default",
  () => ({
    components: { VueStarRating },
    template: `<vue-star-rating />`
  }),{
        info: {
            summary: "",
            useDocgen: true,
            docsInPanel: false,
            header: true,
            source: true
        }
    }
);

story.add(
  "Set number of stars",
  () => ({
    components: { VueStarRating },
    template: `<vue-star-rating :max-num-stars="10" />`
  }),{
        info: {
            summary: "",
            useDocgen: true,
            docsInPanel: false,
            header: true,
            source: true
        }
    }
);

story.add(
  "Initial selected stars",
  () => ({
    components: { VueStarRating },
    template: `<vue-star-rating :max-num-stars="4" :selected-num-stars="3" />`
  }),{
        info: {
            summary: "",
            useDocgen: true,
            docsInPanel: false,
            header: true,
            source: true
        }
    }
);
