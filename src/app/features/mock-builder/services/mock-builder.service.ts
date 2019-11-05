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

    /* Loop through each key in the object */
    for (const prop in originalObj) {
      if (originalObj.hasOwnProperty(prop)) {
        /* If a prop is an object call this recursively */
        if (typeof(originalObj[prop]) !== 'object') {
          const settingsToUse = settings[prop] || settings;
          /* Check value type and limits while building mockedObject */
          switch (typeof(originalObj[prop])) {
            case 'string':
              mockedObject[prop] = this.processString(originalObj[prop], settingsToUse);
              break;
            case 'number':
              mockedObject[prop] = this.numberMockingHandler(originalObj[prop], settingsToUse);
              break;
            case 'boolean':
              mockedObject[prop] = faker.random.boolean();
              break;
            default:
              mockedObject[prop] = 'COULD_NOT_MOCK';
          }
        } else {
          /* If the value is an object, call recursively */
          mockedObject[prop] = this.buildMock(originalObj[prop], settings);
        }
      }
    }
    /* Check if the obj passed in was an Array or Object and return Mock */
    return objIsArray ? Object.values(mockedObject) : mockedObject;
  }

  mockString(inputString: string, mockSettings: MockSettings): string {
    if (!mockSettings.readableSentences) {
      return this.mockStringWithPreservedChars(inputString, mockSettings);
    } else {
      return this.rebuildStringWithBreaks(inputString, ' ', mockSettings);
    }
  }

  processString(inputString: string, mockSettings: MockSettings) {
    /* Check if its a date */
    if (inputString.length > 5 &&
        inputString.indexOf(':') !== -1 &&
        !isNaN(new Date(inputString).getTime()) &&
        inputString.toLowerCase().indexOf('http') === -1) {
      return faker.date.past().toISOString();
    /* Check if its a guid */
    } else if (inputString.match(/([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i)) {
      return faker.random.uuid();
    /* else its a word or sentence */
    } else {
      return this.mockString(inputString, mockSettings);
    }
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

  /*
  * @description - Used as a helper when mocking a string but preserving multiple patterns
  * @param stringToSearch - the string to search through for all the patterns
  * @param pattern - A pattern you want to find all instances of in a string
  * @param indexMap? - A PatternIndexMap list - used to keep track of indexMap when called recursively
  * @return - Returns a StrippedStringMap that maps all indexes a given pattern is located in the stringToSearch
  *                as well as the stringToSearch stripped of all patterns.
  * */
  private getAllIndexOfPattern(stringToSearch: string, pattern: string, indexMap?: PatternIndexMap[]): StrippedStringMap {
    indexMap = indexMap || [];
    let index = stringToSearch.indexOf(pattern);
    let patternRefObj = indexMap.find(obj => obj.pattern === pattern);
    /* Add a patternRefObject to pattern indexMap if it doesn't have one for the pattern */
    if (!patternRefObj) {
      patternRefObj = {pattern, indexList: []};
      indexMap.push(patternRefObj);
    }

    if (index !== -1) {
      patternRefObj.indexList.push(index);
      stringToSearch = stringToSearch.slice(0, index) + stringToSearch.slice(index + pattern.length);
      index = stringToSearch.indexOf(pattern);
      if (index !== -1) {
        const indexMapObj = this.getAllIndexOfPattern(stringToSearch, pattern, indexMap);
        indexMap = indexMapObj.patternIndexMap;
        stringToSearch = indexMapObj.strippedString;
      }
    }

    return {
      patternIndexMap: indexMap,
      strippedString: stringToSearch
    };
  }

  private reconstructStringWithChars(strippedString: string, indexMapList: PatternIndexMap[]): string {
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

  private mockStringWithPreservedChars(stringToMock: string, mockSettings: MockSettings): string {
    /* Automatically preserve ' ' to maintain spaces in sentences */
    const charsToPreserveUnderTheHood = [' '];
    let charsToPreserveIndexMap: PatternIndexMap[] = [];
    let strippedString = stringToMock;
    /* include charsToPreserveUnderTheHood in the charsToPreserve */
    const charsToPreserve = mockSettings.charsToPreserve ?
        [...mockSettings.charsToPreserve, ...charsToPreserveUnderTheHood] :
        [...charsToPreserveUnderTheHood];

    /* Sort array to make sure larger string patterns are found first.
       This ensures that if charsToPreserve = ['/', 'http://'] { the larger http:// pattern would be marked to be preserved first
       so that both http:// and single / are preserved } */
    const sortedCharsToPreserve = this.sortArrayByStringLength(charsToPreserve);

    /* Iterate through each pattern, find all indexes of it in the string, and strip it from the string */
    sortedCharsToPreserve.forEach(pattern => {
      const indexMapObj = this.getAllIndexOfPattern(strippedString, pattern, charsToPreserveIndexMap);
      charsToPreserveIndexMap = indexMapObj.patternIndexMap;
      strippedString = indexMapObj.strippedString;
    });
    const mockedStrippedString = this.stringMockingHandler(strippedString, mockSettings);
    return this.reconstructStringWithChars(mockedStrippedString, charsToPreserveIndexMap);
  }

  /* Breaks down and mocks a string while preserving any breaking characters that you want to preserve (good for sentences or paths) */
  private rebuildStringWithBreaks(inputString: string, breakingChar: string, mockSettings: MockSettings): string {
    const stringArray = inputString.split(breakingChar);
    return stringArray.map(word => this.stringMockingHandler(word, mockSettings)).join(breakingChar);
  }

  private sortArrayByStringLength(charsToPreserve: string[]): string[] {
    return charsToPreserve.sort((a, b) => {
      if (a.length < b.length) {
        return 1;
      }
      if (a.length > b.length) {
        return -1;
      }
      return 0;
    });
  }

}

/* IndexMapObject Interface
* pattern - the pattern we want to keep track of in the string
* indexList - A list of indexes where the pattern appears in the string
* */
interface PatternIndexMap {
  indexList: number[];
  pattern: string;
}

/* IndexMapObject Interface
* pattern - the pattern we want to keep track of in the string
* indexList - A list of indexes where the pattern appears in the string
* */
interface StrippedStringMap {
  patternIndexMap: PatternIndexMap[];
  strippedString: string;
}
