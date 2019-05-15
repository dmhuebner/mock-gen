import { Injectable } from '@angular/core';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})
export class MockBuilderService {

  constructor() { }

  buildMock(originalObj: object): object {
    console.log('originalObj', originalObj);
    const mockedObject = {};
    // Loop through each key in the object
    for (const prop in originalObj) {
      if (originalObj.hasOwnProperty(prop)) {
        // If a prop is an object call this recursively
        if (typeof(originalObj[prop]) !== 'object') {
          // Check value type and limits while building mockedObject
          switch (typeof(originalObj[prop])) {
            case 'string':
              console.log('string', originalObj[prop]);
              mockedObject[prop] = this.processString(originalObj[prop]);
              break;
            case 'number':
              console.log('number', originalObj[prop]);
              mockedObject[prop] = faker.random.number(originalObj[prop]);
              break;
            case 'boolean':
              console.log('boolean', originalObj[prop]);
              mockedObject[prop] = faker.random.boolean();
              break;
            default:
              // Some default
              console.log('default');
          }
        } else {
          console.log('INNER OBJECT', originalObj[prop]);
          // If the value is an object, call self recursively
          this.buildMock(originalObj[prop]);
        }
      }
    }

    // Return completed mock response
    return mockedObject;
  }

  mockString(inputString: string): string {
    const stringWordsArray = inputString.split(' ');
    let mockedVal;
    if (stringWordsArray.length > 1) {
      // Rebuild and randomize sentences with space breaks
      mockedVal = stringWordsArray.map(word => faker.random.alphaNumeric(word.length)).join(' ');
    } else {
      // Mock strings with no spaces
      mockedVal = faker.random.alphaNumeric(inputString.length);
    }
    return mockedVal;
  }

  processString(inputString: string) {
    // Check if its a date
    if (!isNaN(new Date(inputString).getTime())) {
      return faker.date.past().toISOString();
    } else if (inputString.match(/([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i)) {
      // Check if its a guid
      return faker.random.uuid();
    } else {
      // else its a word or sentence...
      return this.mockString(inputString);
    }
  }
}
