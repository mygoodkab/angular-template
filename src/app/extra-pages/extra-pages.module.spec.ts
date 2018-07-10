import { ExtraPagesModule } from './extra-pages.module';

describe('ExtraPagesModule', () => {
  let extraPagesModule: ExtraPagesModule;

  beforeEach(() => {
    extraPagesModule = new ExtraPagesModule();
  });

  it('should create an instance', () => {
    expect(extraPagesModule).toBeTruthy();
  });
});
