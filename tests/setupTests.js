const el = document.createElement('div');
el.setAttribute('data-app', true);
document.body.appendChild(el);

import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

const { getComputedStyle } = window;

window.getComputedStyle = function getComputedStyleStub(el) {
  return {
    ...getComputedStyle(el),
    transitionDelay: '',
    transitionDuration: '',
    animationDelay: '',
    animationDuration: ''
  };
};

/**
 * Mock the global `console` module to check for outputs and errors.
 */
window.createSpyConsole = ()  => {
  // https://stackoverflow.com/questions/44596915/jest-mocking-console-error-tests-fails
  // https://github.com/facebook/react/issues/7047
  let spy = {};

  beforeAll(() => {
    spy.error = jest.spyOn(console, 'error');
  });

  afterEach(() => {
    spy.error.mockReset();
  });

  afterAll(() => {
    spy.error.mockRestore();
  });

  return spy;
};
