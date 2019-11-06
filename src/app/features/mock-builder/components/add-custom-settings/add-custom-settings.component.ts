import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import SettingSpec from '../../interfaces/setting-spec.interface';
import { PropertyType } from '../../interfaces/property-type.interface';

const PROPERTY_TYPES = ['string', 'number', 'boolean'];

@Component({
  selector: 'mg-add-custom-settings',
  templateUrl: './add-custom-settings.component.html',
  styleUrls: ['./add-custom-settings.component.scss']
})
export class AddCustomSettingsComponent implements OnInit {

  @Output() settingAdded: EventEmitter<SettingSpec> = new EventEmitter<SettingSpec>();

  propertyTypes = PROPERTY_TYPES;

  constructor() { }

  ngOnInit() {
  }

  addSettingGroup(propName: string, propType: PropertyType) {
    this.settingAdded.emit({propName, propType});
  }

}
