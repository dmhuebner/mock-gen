import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockBuilderContainerComponent } from './containers/mock-builder-container/mock-builder-container.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

const DECLARATIONS = [
    MockBuilderContainerComponent
];

const MATERIAL_MODULES = [
    MatButtonModule,
    MatInputModule,
    MatIconModule
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
      CommonModule,
      ClipboardModule,
      FormsModule,
      ReactiveFormsModule,
      ...MATERIAL_MODULES
  ],
  exports: [
      ...DECLARATIONS
  ]
})
export class MockBuilderModule { }
