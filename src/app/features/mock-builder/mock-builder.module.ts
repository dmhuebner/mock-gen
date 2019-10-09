import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockBuilderContainerComponent } from './containers/mock-builder-container/mock-builder-container.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingsContainerComponent } from './containers/settings-container/settings-container.component';
import { MatChipsModule } from '@angular/material/chips';

const DECLARATIONS = [
    MockBuilderContainerComponent,
    SettingsContainerComponent
];

const MATERIAL_MODULES = [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule
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
  ],
  entryComponents: [
      SettingsContainerComponent
  ]
})
export class MockBuilderModule { }
