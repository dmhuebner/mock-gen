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

  constructor(private mockBuilderService: MockBuilderService) { }

  ngOnInit() {
    const test = {
      foo: 'bar',
      hey: 'This is secret!',
      stuff: 44,
      isIt: false,
      date: '2019-05-15T04:41:37.944Z',
      id: '123e4567-e89b-12d3-a456-426655440000'
    };
    console.log('test', test);
    this.mockedRespBody = this.mockBuilderService.buildMock(test);
    console.log('mockedRespBody', this.mockedRespBody);
  }

}
