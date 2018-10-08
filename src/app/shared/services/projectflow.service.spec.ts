import { TestBed, inject } from '@angular/core/testing';

import { ProjectflowService } from './projectflow.service';

describe('ProjectflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectflowService]
    });
  });

  it('should be created', inject([ProjectflowService], (service: ProjectflowService) => {
    expect(service).toBeTruthy();
  }));
});
