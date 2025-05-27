import { TestBed } from '@angular/core/testing';

import { HeroJourneyService } from './hero-journey.service';

describe('HeroJourneyService', () => {
  let service: HeroJourneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroJourneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
