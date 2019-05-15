import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockBuilderContainerComponent } from './mock-builder-container.component';

describe('MockBuilderContainerComponent', () => {
  let component: MockBuilderContainerComponent;
  let fixture: ComponentFixture<MockBuilderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockBuilderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockBuilderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
