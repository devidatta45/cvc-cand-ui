import { CVCUIPage } from './app.po';

describe('cvc-ui App', () => {
  let page: CVCUIPage;

  beforeEach(() => {
    page = new CVCUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
