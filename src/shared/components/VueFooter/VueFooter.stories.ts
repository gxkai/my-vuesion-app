import { storiesOf } from "@storybook/vue";
import VueFooter from "./VueFooter.vue";

const story = storiesOf("Organisms|Footer", module) as any;

story.add(
  "Default",
 () => ({
    components: { VueFooter },
    template: `<vue-footer />`
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
