import { Selector } from 'testcafe';

fixture('Index').page('http://localhost:9090/app-template/');

test('the #app element is visible', async (t) => {
  const app = Selector('#app');

  await t.expect(app.visible).ok();
});
