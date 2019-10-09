import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { LETTERS, NUMBERS } from '../constants/available-characters.constant';
import MockSettings from '../interfaces/mock-settings.interface';

@Injectable({
  providedIn: 'root'
})
export class MockBuilderService {

  constructor() { }

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
    let mockedVal = inputString;
    // randomize sentences
    if (inputString.indexOf(' ') > -1) {
      // Rebuild and randomize sentences with space breaks
      mockedVal = this.rebuildStringWithBreaks(inputString, ' ', mockSettings);
    }

    if (mockSettings.charsToPreserve && mockSettings.charsToPreserve.length) {
      // Rebuild and randomize string path with '/'
      // mockedVal = this.rebuildStringWithBreaks(inputString, '/', mockSettings);

      let charsToPreserveIndexMap = [];
      let strippedString = mockedVal;

      mockSettings.charsToPreserve.forEach(pattern => {
        const indexMapObj = this.getAllIndexOfPattern(strippedString, pattern, charsToPreserveIndexMap);
        charsToPreserveIndexMap = indexMapObj.indexMap;
        strippedString = indexMapObj.strippedString;
        console.log('STRIPPED STRING FORMING', strippedString);
      });

      console.log('strippedString', strippedString, 'charsToPreserveIndexMap', charsToPreserveIndexMap);
      const mockedStrippedString = this.stringMockingHandler(strippedString, mockSettings);
      mockedVal = this.reconstructString(mockedStrippedString, charsToPreserveIndexMap);
      console.log('reconstructedString', mockedVal);
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
    if (inputString.length > 5 &&
        inputString.indexOf(':') !== -1 &&
        !isNaN(new Date(inputString).getTime()) &&
        inputString.substring(0, 4).toLowerCase() !== 'http') {
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
    // Loop through and do indexOf each subString
      // If indexOf is not -1
        // push that string with its index into an array, remove it from the string we're searching and continue

    // After we have all the indicies of the chars we want to preserve, mock the string
    // After mocking the string, re-insert all the characters to preserve at the corresponding indicies we captured

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

  private getAllIndexOfPattern(stringToSearch: string, pattern: string, indexMap?: any[]) {
    indexMap = indexMap || [];
    let patternRefObj = indexMap.find(obj => obj.pattern === pattern);
    if (!patternRefObj) {
      patternRefObj = {pattern, indexList: []};
      indexMap.push(patternRefObj);
    }
    let index = stringToSearch.indexOf(pattern);

    if (index !== -1) {
      patternRefObj.indexList.push(index);
      stringToSearch = stringToSearch.slice(0, index) + stringToSearch.slice(index + pattern.length);
      index = stringToSearch.indexOf(pattern);
      if (index !== -1) {
        const indexMapObj = this.getAllIndexOfPattern(stringToSearch, pattern, indexMap);
        indexMap = indexMapObj.indexMap;
        stringToSearch = indexMapObj.strippedString;
      }
    }

    return {
      indexMap,
      strippedString: stringToSearch
    };
  }

  reconstructString(strippedString: string, indexMapList: any[]): string {
    return indexMapList.slice().reverse().reduce((str, indexMapObj) => {
      indexMapObj.indexList.slice().reverse().forEach(index => {
        if (index !== str.length - 1) {
          str = str.slice(0, index) + indexMapObj.pattern + str.slice(index);
        } else {
          str = str.slice(0, index) + indexMapObj.pattern;
        }
      });
      return str;
    }, strippedString);
  }

}
