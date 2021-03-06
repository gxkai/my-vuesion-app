import { storiesOf } from "@storybook/vue";
import VueModal from "./VueModal.vue";
import VueButton from "../VueButton/VueButton.vue";

const story = storiesOf("Molecules|Modal", module) as any;

story.add(
  "Default",
 () => ({
    components: { VueModal, VueButton },
    data() {
      return {
        show: false
      };
    },
    template: `
<div>
  <vue-button @click="show = true" color="secondary">Show</vue-button>
  <vue-modal :show="show" @close="show = false">
    <vue-button color="primary" @click="show = false">Hide</vue-button>
  </vue-modal>
</div>
  `
  }),{
      info: { propTablesExclude: [VueButton] }
    }
);

story.add(
  "Fit Content",
 () => ({
    components: { VueModal, VueButton },
    data() {
      return {
        show: false
      };
    },
    template: `
<div>
  <vue-button @click="show = true" color="secondary">Show</vue-button>
  <vue-modal :show="show" @close="show = false" fit-content>
    <vue-button style="margin: 0;" color="primary" @click="show = false">Hide</vue-button>
  </vue-modal>
</div>
  `
  }),{
        info: {
            summary: "",
            useDocgen: true,
            docsInPanel: false,
            header: true,
            source: true,
            propTablesExclude: [VueButton]
        }
    }
);
