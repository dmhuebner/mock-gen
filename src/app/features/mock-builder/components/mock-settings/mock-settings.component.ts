import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'mg-mock-settings',
  templateUrl: './mock-settings.component.html',
  styleUrls: ['./mock-settings.component.scss']
})
export class MockSettingsComponent implements OnInit {

  @Input() settingsForm: FormGroup;
  @Input() charsToPreserve: string[];
  @Input() settingsHeader: string;
  @Output() changedCharsToPreserve: EventEmitter<string[]> = new EventEmitter<string[]>();

  readonly separatorKeysCodes: number[] = [ENTER];

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    // emit submit event
  }

  addCharToPreserve(event: MatChipInputEvent): void {

    console.log('addCharToPreserve', event);

    const input = event.input;
    const value = event.value || '';

    if (value.trim()) {
      this.charsToPreserve.push(value.trim());
      // this.settingsForm.controls.charsToPreserve.setValue(this.charsToPreserve);
      this.changedCharsToPreserve.emit(this.charsToPreserve);
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
    this.changedCharsToPreserve.emit(this.charsToPreserve);
  }

}
