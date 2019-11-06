# Mock Gen

An app that makes API calls and automatically creates mock responses out of the API response

## Project Setup

```
npm install
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

---

#### TODOs:

- Disable Add Settings button when form fields are not all filled out
- Tool tips with examples for each setting
- Ability to delete a prop setting that you don't want
- Add settings for booleans (random || always true || always false)
- Add feature to randomize a custom enum that the user creates for a prop. For example, they could choose to have a certain field randomized between certain options they give it
- Allow user to select an object to add a setting to (that includes all setting types)
- Make footer in settings modal fixed?
- Refactor dynamically adding settings to form (add with ComponentFactoryResolver)
