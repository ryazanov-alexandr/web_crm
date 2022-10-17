import { TestBed } from '@angular/core/testing';

import { PreloaderInterceptor } from './preloader.interceptor';

describe('PreloaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PreloaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PreloaderInterceptor = TestBed.inject(PreloaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
