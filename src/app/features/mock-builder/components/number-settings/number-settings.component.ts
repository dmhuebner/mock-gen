import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mg-number-settings',
  templateUrl: './number-settings.component.html',
  styleUrls: ['./number-settings.component.scss']
})
export class NumberSettingsComponent implements OnInit {

  @Input() settingsForm: FormGroup;
  @Input() settingsHeader: string;
  @Input() settingsName: string;

  constructor() { }

  ngOnInit() {
  }

}
