import { MainPageModule } from './main-page.module';

describe('MainPageModule', () => {
  let blackPageModule: MainPageModule;

  beforeEach(() => {
    blackPageModule = new MainPageModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
