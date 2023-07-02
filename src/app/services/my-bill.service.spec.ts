import { TestBed } from '@angular/core/testing';

import { MyBillService } from './my-bill.service';

describe('MyBillService', () => {
  let service: MyBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
