import {Component, Input, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {MockBuilderService} from '../../services/mock-builder.service';

@Component({
  selector: 'mg-mock-builder-container',
  templateUrl: './mock-builder-container.component.html',
  styleUrls: ['./mock-builder-container.component.scss']
})
export class MockBuilderContainerComponent implements OnInit {

  @Input() sourceResponse: HttpResponse<object>;
  mockedRespBody: object;
  mockedRespBodyString: string;
  sourceObject: string;

  constructor(private mockBuilderService: MockBuilderService) { }

  ngOnInit() {}

  genMockedObject() {
      this.mockedRespBody = this.mockBuilderService.buildMock(JSON.parse(this.sourceObject));
      console.log('mockedRespBody', this.mockedRespBody);
      this.mockedRespBodyString = JSON.stringify(this.mockedRespBody);
  }

  resetObjectToMock() {
      this.sourceObject = null;
      this.mockedRespBody = null;
  }

}
