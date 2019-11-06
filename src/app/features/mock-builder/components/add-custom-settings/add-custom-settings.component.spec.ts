import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomSettingsComponent } from './add-custom-settings.component';

describe('AddCustomSettingsComponent', () => {
  let component: AddCustomSettingsComponent;
  let fixture: ComponentFixture<AddCustomSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
