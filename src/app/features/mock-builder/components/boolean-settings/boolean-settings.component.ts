import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mg-boolean-settings',
  templateUrl: './boolean-settings.component.html',
  styleUrls: ['./boolean-settings.component.scss']
})
export class BooleanSettingsComponent implements OnInit {

  @Input() settingsForm: FormGroup;
  @Input() settingsHeader: string;
  @Input() settingsName: string;

  constructor() { }

  ngOnInit() {
  }

}
