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
  @Input() charsToPreserve: string[];
  @Output() changedCharsToPreserve: EventEmitter<CharsToPreserveMeta> = new EventEmitter<CharsToPreserveMeta>();

  readonly separatorKeysCodes: number[] = [ENTER];
  charsToPreserveVal: string[];

  constructor() { }

  ngOnInit() {
    this.charsToPreserveVal = this.settingsForm ? this.settingsForm.controls.charsToPreserve.value : [];
  }

  addCharToPreserve(event: MatChipInputEvent): void {

    console.log('addCharToPreserve', event);

    const input = event.input;
    const value = event.value || '';

    if (value.trim()) {
      this.charsToPreserve.push(value.trim());
      // this.settingsForm.controls.charsToPreserve.setValue(this.charsToPreserve);
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

    // this.settingsForm.controls.charsToPreserve.setValue(this.charsToPreserve);
    // TODO emit event and have parent setValue
    this.changedCharsToPreserve.emit({name: this.settingsName, charsToPreserve: this.charsToPreserve});
  }

}
