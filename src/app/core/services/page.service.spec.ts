import { TestBed } from '@angular/core/testing';

import { PageService } from './page.service';

describe('PageService', () => {
  let service: PageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set title with setTitle()', () => {
    service.setTitle('test');
    expect(service.pageTitle).toEqual('test');
  });

  it('should return title with getTitle()', () => {
    service.setTitle('test');
    expect(service.getTitle()).toEqual('test');
  });

  it('should pageTitle$ next been called', () => {
    const nextSpy = spyOn(service.pageTitle$, 'next');
    service.setTitle('test');

    expect(nextSpy).toHaveBeenCalledWith('test');
  });
});
