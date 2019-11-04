import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanSettingsComponent } from './boolean-settings.component';

describe('BooleanSettingsComponent', () => {
  let component: BooleanSettingsComponent;
  let fixture: ComponentFixture<BooleanSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
