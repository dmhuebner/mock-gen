import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { LETTERS, NUMBERS } from '../constants/available-characters.constant';
import MockSettings from '../interfaces/mock-settings.interface';

@Injectable({
  providedIn: 'root'
})
export class MockBuilderService {

  constructor() { }

  // TODO make interface for settings
  buildMock(originalObj: object, settings: MockSettings): object {
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
              mockedObject[prop] = this.processString(originalObj[prop], settings);
              break;
            case 'number':
              mockedObject[prop] = this.numberMockingHandler(originalObj[prop], settings);
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
          mockedObject[prop] = this.buildMock(originalObj[prop], settings);
        }
      }
    }

    // Check if the obj passed in was an Array or Object and return Mock
    return objIsArray ? Object.values(mockedObject) : mockedObject;
  }

  mockString(inputString: string, mockSettings: MockSettings): string {
    let mockedVal;
    // randomize sentences
    if (inputString.indexOf(' ') > -1) {
      // Rebuild and randomize sentences with space breaks
      mockedVal = this.rebuildStringWithBreaks(inputString, ' ', mockSettings);
    } else if (inputString.indexOf('/') > -1) {
      // Rebuild and randomize string path with '/'
      mockedVal = this.rebuildStringWithBreaks(inputString, '/', mockSettings);
    } else {
      // Mock strings with no spaces
      mockedVal = mockSettings.preserveLetterAndNumberTypes
          ? this.replaceCharTypes(inputString)
          : faker.random.alphaNumeric(inputString.length);
    }
    return mockedVal;
  }

  processString(inputString: string, mockSettings: MockSettings) {
    // Check if its a date
    if (inputString.length > 5 && inputString.indexOf(':') !== -1 && !isNaN(new Date(inputString).getTime())) {
      return faker.date.past().toISOString();
    } else if (inputString.match(/([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i)) {
      // Check if its a guid
      return faker.random.uuid();
    } else {
      // else its a word or sentence...
      return this.mockString(inputString, mockSettings);
    }
  }

  // Breaks down and mocks a string while preserving any breaking characters that you want to preserve (good for sentences or paths)
  private rebuildStringWithBreaks(inputString: string, breakingChar: string, mockSettings: MockSettings): string {
    const stringArray = inputString.split(breakingChar);
    return stringArray.map(word => this.stringMockingHandler(word, mockSettings)).join(breakingChar);
  }

  private replaceCharTypes(inputString: string): string {
    return inputString.split('').map((char) => {
      if (isNaN(Number(char))) {
        return LETTERS[Math.floor(Math.random() * LETTERS.length - 1)];
      } else {
        return NUMBERS[Math.floor(Math.random() * NUMBERS.length - 1)];
      }
    }).join('');
  }

  private stringMockingHandler(inputString: string, mockSettings: MockSettings): string {
    if (mockSettings.readableSentences) {
      if (!isNaN(Number(inputString)) && mockSettings.preserveLetterAndNumberTypes) {
        return String(this.numberMockingHandler(Number(inputString), mockSettings));
      } else {
        return faker.random.word();
      }
    } else if (mockSettings.preserveLetterAndNumberTypes) {
      return this.replaceCharTypes(inputString);
    } else {
      return faker.random.alphaNumeric(inputString.length);
    }
  }

  private numberMockingHandler(inputNumber: number, mockSettings: MockSettings): number {
    if (mockSettings.mockNumberUpToPlace) {
      return Number(inputNumber.toString().split('').map(num => faker.random.number(9)).join(''));
    } else {
      return faker.random.number(inputNumber);
    }
  }
}
