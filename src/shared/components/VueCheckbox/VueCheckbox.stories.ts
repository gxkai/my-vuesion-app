import { storiesOf } from "@storybook/vue";
import VueCheckbox from "./VueCheckbox.vue";
import { action } from "@storybook/addon-actions";

const story = storiesOf("Atoms|Checkbox", module) as any;

story.add(
  "Checkbox",
  () => ({
    components: { VueCheckbox },
    data() {
      return {
        model: false
      };
    },
    template: `<vue-checkbox label="checkbox" name="checkbox" id="checkbox" @click="action" v-model="model" />`,
    methods: {
      action: action("@onClick")
    }
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
  "Checkbox Disabled",
 () => ({
    components: { VueCheckbox },
    data() {
      return {
        model: false
      };
    },
    template: `<vue-checkbox label="checkbox" name="checkbox" id="checkbox" disabled @click="action" v-model="model" />`,
    methods: {
      action: action("@onClick")
    }
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
  "Radio Button",
 () => ({
    components: { VueCheckbox },
    data() {
      return {
        model: false
      };
    },
    template: `<vue-checkbox label="radio button" name="radio" id="radio" radio @click="action" v-model="model" />`,
    methods: {
      action: action("@onClick")
    }
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
  "Radio Button disabled",
 () => ({
    components: { VueCheckbox },
    data() {
      return {
        model: false
      };
    },
    template: `<vue-checkbox label="radio button" name="radio" id="radio" radio disabled @click="action" v-model="model" />`,
    methods: {
      action: action("@onClick")
    }
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
