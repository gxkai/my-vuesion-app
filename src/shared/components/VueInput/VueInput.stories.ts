import { storiesOf } from "@storybook/vue";
import VueInput from "./VueInput.vue";
import VueButton from "../VueButton/VueButton.vue";
import VueModal from "../VueModal/VueModal.vue";

const story = storiesOf("Atoms|Input", module) as any;

story.add(
  "Default",
  () => ({
    components: { VueInput },
    data() {
      return {
        model: ""
      };
    },
    template: `<vue-input placeholder="Name" name="name" id="name" v-model="model" />`
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
  "Disabled",
  () => ({
    components: { VueInput },
    data() {
      return {
        model: ""
      };
    },
    template: `<vue-input placeholder="Name" name="name" id="name" v-model="model" :disabled="true" />`
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
  "Hint",
 () => ({
    components: { VueInput },
    data() {
      return {
        model: ""
      };
    },
    template: `<vue-input placeholder="Name" name="name" id="name" v-model="model" message="description" />`
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
  "Validation/Error state",
  () => ({
    components: { VueInput },
    data() {
      return {
        model: ""
      };
    },
    template: `<vue-input placeholder="Name" name="name" id="name" v-model="model" validation="required|integer" required message="please enter a number" errorMessage="This is not a number" />`
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
  "Readonly",
 () => ({
    components: { VueInput },
    data() {
      return {
        model: ""
      };
    },
    template: `<vue-input placeholder="Name" name="name" id="name" value="foo" readonly />`
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
  "SPA autofocus",
 () => ({
    components: { VueInput, VueButton, VueModal },
    data() {
      return {
        model: "",
        show: false
      };
    },
    template: `<div>
  <vue-button @click="show = !show" color="primary">Login</vue-button>

  <vue-modal :show="show" @close="show = false">
    <vue-input autofocus placeholder="Name" name="name" id="name" v-model="model" />
    <vue-button ghost @click="show = !show">Close</vue-button>
  </vue-modal>
</div>`
  }),{
        info: {
            propTablesExclude: [VueButton, VueModal],
            summary: "",
            useDocgen: true,
            docsInPanel: false,
            header: true,
            source: true
        }
    }
);
