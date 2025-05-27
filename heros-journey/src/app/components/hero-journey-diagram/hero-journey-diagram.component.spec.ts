import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroJourneyDiagramComponent } from './hero-journey-diagram.component';

describe('HeroJourneyDiagramComponent', () => {
  let component: HeroJourneyDiagramComponent;
  let fixture: ComponentFixture<HeroJourneyDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroJourneyDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroJourneyDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
