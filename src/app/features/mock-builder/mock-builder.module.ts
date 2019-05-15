import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockBuilderContainerComponent } from './containers/mock-builder-container/mock-builder-container.component';

const DECLARATIONS = [
    MockBuilderContainerComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule
  ],
  exports: [
      ...DECLARATIONS
  ]
})
export class MockBuilderModule { }
