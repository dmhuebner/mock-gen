import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { CharsToPreserveMeta } from '../../interfaces/chars-to-preserve-meta.interface';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'mg-string-settings',
  templateUrl: './string-settings.component.html',
  styleUrls: ['./string-settings.component.scss']
})
export class StringSettingsComponent implements OnInit {

  @Input() settingsForm: FormGroup;
  @Input() settingsName: string;
  @Input() settingsType: 'string' | 'number' | 'boolean';
  @Input() charsToPreserve: string[] = [];
  @Output() changedCharsToPreserve: EventEmitter<CharsToPreserveMeta> = new EventEmitter<CharsToPreserveMeta>();

  readonly separatorKeysCodes: number[] = [ENTER];

  constructor() { }

  ngOnInit() {
    // Set charsToPreserve for prop setting if there is a settingsName
    console.log('settingsForm', this.settingsForm);
    if (this.settingsForm && this.settingsForm.controls[this.settingsName]) {
      this.charsToPreserve = this.settingsForm.value[this.settingsName].charsToPreserve.value.slice();
    } else if (this.settingsForm && this.settingsForm.controls.charsToPreserve.value) {
      // Else Set charsToPreserve for global setting
      this.charsToPreserve = this.settingsForm.controls.charsToPreserve.value.slice();
    } else {
      this.charsToPreserve = [];
    }
  }

  addCharToPreserve(event: MatChipInputEvent): void {

    console.log('addCharToPreserve', event);

    const input = event.input;
    const value = event.value || '';

    if (value.trim()) {
      this.charsToPreserve.push(value.trim());
      this.changedCharsToPreserve.emit({name: this.settingsName, charsToPreserve: this.charsToPreserve});
    }

    if (input) {
      input.value = '';
    }
  }

  removeCharToPreserve(charsToPreserve: string): void {
    const index = this.charsToPreserve.indexOf(charsToPreserve);
    if (index >= 0) {
      this.charsToPreserve.splice(index, 1);
    }

    this.changedCharsToPreserve.emit({name: this.settingsName, charsToPreserve: this.charsToPreserve});
  }

}
