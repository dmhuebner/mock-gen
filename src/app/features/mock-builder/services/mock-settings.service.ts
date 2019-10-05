import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import MockSettings from '../interfaces/mock-settings.interface';
import { DEFAULT_MOCK_SETTINGS } from '../constants/default-settings.constant';

@Injectable({
  providedIn: 'root'
})
export class MockSettingsService {

  private defaultSettings: MockSettings = DEFAULT_MOCK_SETTINGS;
  private mockSettingsSubject: BehaviorSubject<MockSettings> = new BehaviorSubject<MockSettings>(this.defaultSettings);
  mockSettings$: Observable<MockSettings> = this.mockSettingsSubject.asObservable();

  constructor() {}

  updateSettings(currentSettings: MockSettings) {
    this.mockSettingsSubject.next(currentSettings);
  }
}
