import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import router from '@/router';
import App from '@/App';
import Page1 from '@/views/Page1';
import Page2 from '@/views/Page2';

const localVue = createLocalVue();
localVue.use(VueRouter);

// mock child components ie. pages
jest.mock('@/views/Page1.vue', () => ({
  name: 'Page1',
  render: h => h('div')
}));
jest.mock('@/views/Page2.vue', () => ({
  name: 'Page1',
  render: h => h('div')
}));

describe('router', () =>{
  let wrapper;

  beforeEach(() => {
    wrapper = mount(App, {
      localVue,
      router
    });
  });

  it('should render page 1 by default', () => {
    expect(wrapper.find(Page1).exists()).toBe(true);
  });

  it('should render page 1 when navigate to /page1', () => {
    router.push('/page1');
    expect(wrapper.find(Page1).exists()).toBe(true);
  });

  it('should render page 2 when navigate to /page2', () => {
    router.push('/page2');
    expect(wrapper.find(Page2).exists()).toBe(true);
  });
});
