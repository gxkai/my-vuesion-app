import { storiesOf } from "@storybook/vue";
import VueNavBar from "./VueNavBar.vue";

const story = storiesOf("Organisms|NavBar", module) as any;

story.add(
  "Default",
  () => ({
    components: { VueNavBar },
    template: `<vue-nav-bar />`
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
