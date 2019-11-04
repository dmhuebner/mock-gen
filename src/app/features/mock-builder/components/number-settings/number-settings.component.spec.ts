import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSettingsComponent } from './number-settings.component';

describe('NumberSettingsComponent', () => {
  let component: NumberSettingsComponent;
  let fixture: ComponentFixture<NumberSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
