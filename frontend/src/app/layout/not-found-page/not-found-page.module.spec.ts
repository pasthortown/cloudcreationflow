import { NotFoundPageModule } from './not-found-page.module';

describe('NotFoundPageModule', () => {
  let blackPageModule: NotFoundPageModule;

  beforeEach(() => {
    blackPageModule = new NotFoundPageModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
