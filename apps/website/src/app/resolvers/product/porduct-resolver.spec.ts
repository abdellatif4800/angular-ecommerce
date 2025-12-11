import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { porductResolver } from './porduct-resolver';

describe('porductResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => porductResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
