import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockSettingsComponent } from './mock-settings.component';

describe('MockSettingsComponent', () => {
  let component: MockSettingsComponent;
  let fixture: ComponentFixture<MockSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
