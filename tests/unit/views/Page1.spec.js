import { mount } from '@vue/test-utils';
import Page1 from '@/views/Page1.vue';


describe('Page1.vue', () => {
  let wrapper;

  const findByTestingId = id => wrapper.find(`[data-test-id="${id}"]`);

  beforeEach(() => {
    wrapper = mount(Page1);
  });

  it('should render a form', () => {
    expect(findByTestingId('form').exists()).toEqual(true);
  });
});
