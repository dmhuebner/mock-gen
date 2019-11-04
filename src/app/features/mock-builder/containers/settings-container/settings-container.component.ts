import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MockSettingsService } from '../../services/mock-settings.service';
import MockSettings from '../../interfaces/mock-settings.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER } from '@angular/cdk/keycodes';
import { CharsToPreserveMeta } from '../../interfaces/chars-to-preserve-meta.interface';

const PROPERTY_TYPES = ['string', 'number', 'boolean'];

interface PropSettingsRef {
  propName: string;
  type: 'string' | 'number' | 'boolean';
}

@Component({
  selector: 'mg-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit, OnDestroy {

  propertyTypes = PROPERTY_TYPES;
  settingsForm: FormGroup;
  currentSettings: MockSettings;
  unsubscribe$ = new Subject();
  charsToPreserve: string[] = [];
  charsToPreservePerPropMap: any = {};
  propSettingsList: PropSettingsRef[] = [];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<SettingsContainerComponent>,
              private settingsService: MockSettingsService) { }

  ngOnInit() {
    this.settingsService.mockSettings$.pipe(
        takeUntil(this.unsubscribe$)
    ).subscribe((settings: MockSettings) => {
      this.currentSettings = settings;
      // Set global settings in map
      this.charsToPreservePerPropMap.global = this.currentSettings.charsToPreserve;
    });
    this.settingsForm = this.initializeSettingsForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  initializeSettingsForm(): FormGroup {
    const standardSettings = ['readableSentences', 'preserveLetterAndNumberTypes', 'charsToPreserve', 'mockNumberUpToPlace'];

    const settingsGroup = this.getSettingsGroup();

    Object.keys(this.currentSettings).forEach(setting => {
      if (!standardSettings.includes(setting)) {
        this.addSettingGroup(setting, this.currentSettings[setting].propType, settingsGroup);
      }
    });

    return settingsGroup;
  }

  onSubmit() {
    this.settingsService.updateSettings(this.settingsForm.value);
    this.dialogRef.close();
  }

  getSettingsGroup(type?: 'string' | 'number' | 'boolean', settingPropName?: string): FormGroup {
    let group = this.fb.group({});

    switch (type) {
      case 'string':
        group = this.addStringSettingsToGroup(group, settingPropName);
        group.addControl('propType', new FormControl('string', []));
        break;
      case 'number':
        group = this.addNumberSettingsToGroup(group, settingPropName);
        group.addControl('propType', new FormControl('number', []));
        break;
      case 'boolean':
        // group = this.addBooleanSettingsToGroup(group);
        group.addControl('propType', new FormControl('boolean', []));
        break;
      default:
        group = this.addStringSettingsToGroup(group);
        group = this.addNumberSettingsToGroup(group);
        // group = this.addBooleanSettingsToGroup(group);
    }

    return group;
  }

  addStringSettingsToGroup(group: FormGroup, settingPropName?: string): FormGroup {
    let settings: MockSettings;
    if (settingPropName && this.currentSettings[settingPropName]) {
      settings = this.currentSettings[settingPropName];
    } else {
      settings = this.currentSettings;
    }
    group.addControl('readableSentences', new FormControl(settings.readableSentences || false, []));
    group.addControl('preserveLetterAndNumberTypes', new FormControl(
        settings ? settings.preserveLetterAndNumberTypes : true, []
      ));
    group.addControl('charsToPreserve', new FormControl(settings.charsToPreserve || false, []));
    return group;
  }

  addNumberSettingsToGroup(group: FormGroup, settingPropName?: string): FormGroup {
    let settings: MockSettings;
    if (settingPropName && this.currentSettings[settingPropName]) {
      settings = this.currentSettings[settingPropName];
    } else {
      settings = this.currentSettings;
    }
    group.addControl('mockNumberUpToPlace', new FormControl(settings.mockNumberUpToPlace || false, []));
    return group;
  }

  onCharsToPreserveChanged(updatedCharsMeta: CharsToPreserveMeta): void {
    if (updatedCharsMeta.name) {
      if (updatedCharsMeta.name.indexOf('.') === -1) {
        this.charsToPreservePerPropMap[updatedCharsMeta.name] = updatedCharsMeta.charsToPreserve;
        this.settingsForm.controls[updatedCharsMeta.name].get('charsToPreserve').setValue(updatedCharsMeta.charsToPreserve);
      } else {
        // TODO drill into . value
      }
    } else {
      this.settingsForm.get('charsToPreserve').setValue(updatedCharsMeta.charsToPreserve);
    }
  }

  addSettingGroup(settingProp: string, propType: 'string' | 'number' | 'boolean', formGroup: FormGroup = this.settingsForm) {
    this.propSettingsList.push({propName: settingProp, type: propType});
    this.charsToPreservePerPropMap[settingProp] = this.currentSettings[settingProp]
        ? this.currentSettings[settingProp].charsToPreserve
        : [];
    formGroup.addControl(settingProp, this.getSettingsGroup(propType, settingProp));
  }
}


