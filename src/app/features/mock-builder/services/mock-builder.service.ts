import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { LETTERS, NUMBERS } from '../constants/available-characters.constant';

@Injectable({
  providedIn: 'root'
})
export class MockBuilderService {

  constructor() { }

  // TODO make interface for settings
  buildMock(originalObj: object, settings?: any): object {
    const mockedObject = {};
    const objIsArray = originalObj instanceof Array;

    // Loop through each key in the object
    for (const prop in originalObj) {
      if (originalObj.hasOwnProperty(prop)) {
        // If a prop is an object call this recursively
        if (typeof(originalObj[prop]) !== 'object') {
          // Check value type and limits while building mockedObject
          switch (typeof(originalObj[prop])) {
            case 'string':
              // preserveTypes setting for strings is designed to preserve letters or numbers in the output mocked string
              const preserveTypes = settings ? settings.strings.preserveTypes : true;
              mockedObject[prop] = this.processString(originalObj[prop], preserveTypes);
              break;
            case 'number':
              mockedObject[prop] = faker.random.number(originalObj[prop]);
              break;
            case 'boolean':
              mockedObject[prop] = faker.random.boolean();
              break;
            default:
              // Some default
              mockedObject[prop] = 'COULD_NOT_MOCK';
          }
        } else {
          // If the value is an object, call recursively
          mockedObject[prop] = this.buildMock(originalObj[prop]);
        }
      }
    }

    // Check if the obj passed in was an Array or Object and return Mock
    return objIsArray ? Object.values(mockedObject) : mockedObject;
  }

  mockString(inputString: string, preserveTypes: boolean): string {
    let mockedVal;
    // randomize sentences
    if (inputString.indexOf(' ') > -1) {
      // Rebuild and randomize sentences with space breaks
      mockedVal = this.rebuildStringWithBreaks(inputString, ' ', preserveTypes);
    } else if (inputString.indexOf('/') > -1) {
      // Rebuild and randomize string path with '/'
      mockedVal = this.rebuildStringWithBreaks(inputString, '/', preserveTypes);
    } else {
      // Mock strings with no spaces
      mockedVal = faker.random.alphaNumeric(inputString.length);
    }
    return mockedVal;
  }

  processString(inputString: string, preserveTypes: boolean) {
    // Check if its a date
    if (inputString.length > 5 && inputString.indexOf(':') !== -1 && !isNaN(new Date(inputString).getTime())) {
      return faker.date.past().toISOString();
    } else if (inputString.match(/([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i)) {
      // Check if its a guid
      return faker.random.uuid();
    } else {
      // else its a word or sentence...
      return this.mockString(inputString, preserveTypes);
    }
  }

  // Breaks down and mocks a string while preserving any breaking characters that you want to preserve (good for sentences or paths)
  private rebuildStringWithBreaks(inputString: string, breakingChar: string, preserveTypes: boolean = true): string {
    const stringArray = inputString.split(breakingChar);
    if (preserveTypes) {
      return stringArray.map(word => this.replaceCharTypes(word)).join(breakingChar);
    } else {
      return stringArray.map(word => faker.random.alphaNumeric(word.length)).join(breakingChar);
    }
  }

  private replaceCharTypes(inputString: string): string {
    return inputString.split('').map((char) => {
      if (isNaN(Number(char))) {
        return LETTERS[Math.floor(Math.random() * 25)];
      } else {
        return NUMBERS[Math.floor(Math.random() * 9)];
      }
    }).join('');
  }
}
