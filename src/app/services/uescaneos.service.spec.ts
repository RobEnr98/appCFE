import { TestBed } from '@angular/core/testing';

import { UescaneosService } from './uescaneos.service';

describe('UescaneosService', () => {
  let service: UescaneosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UescaneosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
