import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockBuilderContainerComponent } from './containers/mock-builder-container/mock-builder-container.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';

const DECLARATIONS = [
    MockBuilderContainerComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
      CommonModule,
      ClipboardModule,
      FormsModule
  ],
  exports: [
      ...DECLARATIONS
  ]
})
export class MockBuilderModule { }
