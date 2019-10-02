import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MockSettingsService } from '../../services/mock-settings.service';
import MockSettings from '../../interfaces/mock-settings.interface';

@Component({
  selector: 'mg-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit {

  settingsForm: FormGroup;
  currentSettings: MockSettings

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<SettingsContainerComponent>,
              private settingsService: MockSettingsService) { }

  ngOnInit() {
    this.settingsService.mockSettings$.subscribe((settings) => {
      this.currentSettings = settings;
    });
    this.settingsForm = this.initializeSettingsForm();
  }

  initializeSettingsForm(): FormGroup {
    return this.fb.group({
      readableSentences: [this.currentSettings.readableSentences || false, []],
      mockNumberUpToPlace: [this.currentSettings.mockNumberUpToPlace || false, []]
    });
  }

  onSubmit() {
    this.settingsService.updateSettings(this.settingsForm.value);
    this.dialogRef.close();
  }
}


