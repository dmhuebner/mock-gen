import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MockBuilderService } from '../../services/mock-builder.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SettingsContainerComponent } from '../settings-container/settings-container.component';
import { MockSettingsService } from '../../services/mock-settings.service';
import { takeUntil } from 'rxjs/operators';
import MockSettings from '../../interfaces/mock-settings.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'mg-mock-builder-container',
  templateUrl: './mock-builder-container.component.html',
  styleUrls: ['./mock-builder-container.component.scss']
})
export class MockBuilderContainerComponent implements OnInit {

  @Input() sourceResponse: HttpResponse<object>;
  mockedRespBody: object;
  mockedRespBodyString: string;
  mockResult: object;
  sourceObject: string;
  numOfMocks: number;
  multipleMocks = false;
  currentSettings: MockSettings;
  unsubscribe$ = new Subject();

  constructor(private mockBuilderService: MockBuilderService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              public settingsService: MockSettingsService) { }

  ngOnInit() {
      this.settingsService.mockSettings$.pipe(
          takeUntil(this.unsubscribe$)
      ).subscribe((settings: MockSettings) => {
          this.currentSettings = settings;
      });
  }

  genMockedObject(numOfMocks?: number): void {
      const mockList: object[] = [];
      try {
          if (!this.sourceObject || this.sourceObject === '{}' || this.sourceObject === '[]') {
              this.onInvalidInput('Object cannot be empty');
              return;
          }

          if (this.multipleMocks && numOfMocks) {
              for (let i = 0; i < numOfMocks; i++) {
                  mockList.push(this.mockBuilderService.buildMock(JSON.parse(this.sourceObject), this.currentSettings));
              }
              this.mockResult = mockList;
          } else {
              this.mockResult = this.mockBuilderService.buildMock(JSON.parse(this.sourceObject), this.currentSettings);
          }

          this.mockedRespBodyString = JSON.stringify(this.mockResult);
          this.notifyMockGenStatus();
      } catch (err) {
          console.log(err);
          this.onInvalidInput('Invalid JSON');
      }
  }

  resetObjectToMock() {
      this.sourceObject = null;
      this.mockResult = null;
  }

  onCopyMockToClipboard() {
      this.snackBar.open('Copied!', null, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: 'success-snackbar'
      });
  }

  openSettings() {
      const dialogRef = this.dialog.open(SettingsContainerComponent, {});
  }

  private onInvalidInput(message: string) {
      this.snackBar.open(message, null, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: 'error-snackbar'
      });
      this.mockedRespBody = null;
  }

  private notifyMockGenStatus() {
      if (JSON.stringify(this.mockResult) === '{}') {
          this.onInvalidInput('Invalid JSON');
      } else {
          this.snackBar.open('Mock Generated!', null, {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 2000,
              panelClass: 'success-snackbar'
          });
      }
  }

}
