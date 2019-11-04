import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CharsToPreserveMeta } from '../../interfaces/chars-to-preserve-meta.interface';

@Component({
  selector: 'mg-mock-settings',
  templateUrl: './mock-settings.component.html',
  styleUrls: ['./mock-settings.component.scss']
})
export class MockSettingsComponent implements OnInit {

  @Input() settingsForm: FormGroup;
  @Input() settingsHeader: string;
  @Input() settingsName: string;
  @Input() charsToPreserve: string[];
  @Output() changedCharsToPreserve: EventEmitter<CharsToPreserveMeta> = new EventEmitter<CharsToPreserveMeta>();

  constructor() { }

  ngOnInit() {
  }

  // TODO type that param
  onChangedCharsToPreserve(updatedCharsToPreserve: CharsToPreserveMeta) {
    this.changedCharsToPreserve.emit(updatedCharsToPreserve);
  }

}
