import { addParameters, configure, addDecorator } from '@storybook/vue';
import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import { checkA11y } from '@storybook/addon-a11y';
import {setDefaults, withInfo} from 'storybook-addon-vue-info';
import '@storybook/addon-console';
import '../src/shared/_design-system.scss';
import '../src/shared/designSystem/reset.scss';
import '../src/shared/designSystem/global.scss';
import '../src/shared/designSystem/typo.scss';
import customTheme from './theme';
import {withKnobs} from "@storybook/addon-knobs";

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.use(VeeValidate);

const req = require.context('../src', true, /.stories.ts$/);

const loadStories = () => {
  req.keys().forEach((filename) => req(filename));
};
addDecorator(withKnobs)
addDecorator(withInfo);
addDecorator(require('storybook-vue-router').default());

addParameters(checkA11y);

addParameters({
  options: {
    theme: customTheme,
    showPanel: true,
    panelPosition: 'right',
  },
});

setDefaults({ header: true });

configure(loadStories, module);
