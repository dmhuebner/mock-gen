import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MockSettingsService } from '../../services/mock-settings.service';
import MockSettings from '../../interfaces/mock-settings.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mg-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit, OnDestroy {

  settingsForm: FormGroup;
  currentSettings: MockSettings;
  unsubscribe$ = new Subject();

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<SettingsContainerComponent>,
              private settingsService: MockSettingsService) { }

  ngOnInit() {
    this.settingsService.mockSettings$.pipe(
        takeUntil(this.unsubscribe$)
    ).subscribe((settings: MockSettings) => this.currentSettings = settings);
    this.settingsForm = this.initializeSettingsForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  initializeSettingsForm(): FormGroup {
    return this.fb.group({
      readableSentences: [this.currentSettings.readableSentences || false, []],
      preserveLetterAndNumberTypes: [this.currentSettings ? this.currentSettings.preserveLetterAndNumberTypes : true, []],
      mockNumberUpToPlace: [this.currentSettings.mockNumberUpToPlace || false, []]
    });
  }

  onSubmit() {
    this.settingsService.updateSettings(this.settingsForm.value);
    this.dialogRef.close();
  }
}


