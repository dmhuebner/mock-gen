import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MockSettingsService } from '../../services/mock-settings.service';
import MockSettings from '../../interfaces/mock-settings.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'mg-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit, OnDestroy {

  settingsForm: FormGroup;
  currentSettings: MockSettings;
  unsubscribe$ = new Subject();
  // readonly separatorKeysCodes: number[] = [ENTER];
  charsToPreserve: string[];
  charsToPreservePerPropMap = {};
  propSettingsList: string[] = [];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<SettingsContainerComponent>,
              private settingsService: MockSettingsService) { }

  ngOnInit() {
    this.settingsService.mockSettings$.pipe(
        takeUntil(this.unsubscribe$)
    ).subscribe((settings: MockSettings) => {
      this.currentSettings = settings;
      this.charsToPreserve = this.currentSettings.charsToPreserve;
    });
    this.settingsForm = this.initializeSettingsForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  initializeSettingsForm(): FormGroup {
    return this.fb.group({
      readableSentences: [this.currentSettings.readableSentences || false, []],
      preserveLetterAndNumberTypes: [this.currentSettings ? this.currentSettings.preserveLetterAndNumberTypes : true, []],
      charsToPreserve: [this.currentSettings.charsToPreserve, []],
      mockNumberUpToPlace: [this.currentSettings.mockNumberUpToPlace || false, []]
    });
  }

  onSubmit() {
    this.settingsService.updateSettings(this.settingsForm.value);
    this.dialogRef.close();
  }

  // addCharToPreserve(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //
  //   if ((value || '').trim()) {
  //     this.charsToPreserve.push(value.trim());
  //     this.settingsForm.controls.charsToPreserve.setValue(this.charsToPreserve);
  //   }
  //
  //   if (input) {
  //     input.value = '';
  //   }
  // }
  //
  // removeCharToPreserve(charsToPreserve: string): void {
  //   const index = this.charsToPreserve.indexOf(charsToPreserve);
  //   if (index >= 0) {
  //     this.charsToPreserve.splice(index, 1);
  //   }
  //
  //   this.settingsForm.controls.charsToPreserve.setValue(this.charsToPreserve);
  // }

  // TODO fix this function so that it works with not just general settings but property specific settings
  onCharsToPreserveChanged(updatedCharsToPreserve: string[]): void {
    // if (updatedCharsToPreserveMeta.propName) {
    //
    // }
    this.settingsForm.get('charsToPreserve').setValue(updatedCharsToPreserve);
  }

  addSettingGroup(settingProp: string) {
    console.log(settingProp);
    this.propSettingsList.push(settingProp);
    this.settingsForm.addControl(settingProp, this.initializeSettingsForm());
  }
}


