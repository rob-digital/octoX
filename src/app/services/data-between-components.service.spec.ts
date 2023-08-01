import { TestBed } from '@angular/core/testing';

import { DataBetweenComponentsService } from './data-between-components.service';

describe('DataBetweenComponentsService', () => {
  let service: DataBetweenComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBetweenComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
