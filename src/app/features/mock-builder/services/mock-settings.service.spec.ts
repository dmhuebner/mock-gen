import { TestBed } from '@angular/core/testing';

import { MockSettingsService } from './mock-settings.service';

describe('MockSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockSettingsService = TestBed.get(MockSettingsService);
    expect(service).toBeTruthy();
  });
});
