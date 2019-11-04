import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringSettingsComponent } from './string-settings.component';

describe('StringSettingsComponent', () => {
  let component: StringSettingsComponent;
  let fixture: ComponentFixture<StringSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
