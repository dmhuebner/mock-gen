import { TestBed } from '@angular/core/testing';

import { MockBuilderService } from './mock-builder.service';

describe('MockBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockBuilderService = TestBed.get(MockBuilderService);
    expect(service).toBeTruthy();
  });
});
