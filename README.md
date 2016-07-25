## Introduction
Githubber - Application that lists github repositories for a given user

App is taking advantage of RXJS and Observables in Angular 2 

Some of the features in the search :

* Do not trigger the search request on every key stroke, wait until user stops typing

One should not trigger the search endpoint more often than needed. Basically one only wants to hit it once the user has stopped typing instead of with every keystroke.
We need to call:
```bash
debounceTime(500)
```
500 is the value in miliseconds

* Don’t trigger the same search query twice or more in a row
It would be a waste of resources to send out another request for a search term that the application already shows the results for. Fortunately Rx helps with that. All what is needed to do to achieve the desired behavior is to call
```bash
distinctUntilChanged()
```
Technology stack:

* [NPM](https://www.npmjs.com/) for package manager

* [TypeScript](http://www.typescriptlang.org/) for transpiling, types and es6 features

* [Typings](https://github.com/typings/typings) as TypeScript definition manager
  
* [Gulp](http://gulpjs.com/) for task automation

* [Browsersync](https://www.browsersync.io/) for development server & reload

* [SystemJS](https://github.com/systemjs/systemjs) as module loader

* [Codelyzer](https://github.com/mgechev/codelyzer) as linter

* [Karma](http://karma-runner.github.io/) as test-runner

* [Jasmine](http://jasmine.github.io/) as test framework

* [Istanbul](https://github.com/gotwarlost/istanbul) for test coverage

WIP Protractor for E2E Tests

## Installation
*Required:
> [Node.js](https://nodejs.org/en/)
> [NPM](https://www.npmjs.com/) 

Install packages:

```bash
npm install
```

## Start
Start up the server:
`gulp` or `gulp serve-dev` (default task)

The browser will popup and serve the application.
Every changes to the file will refresh the browser automatically
and it'll also compile your changed TypeScripts files to Javascript files.

## Unit testing

Run the command
```bash
gulp test
```
and it'll compile all TypeScript files, start Karma, then remap Istanbul coverage so that it shows TypeScript coverage, not the transpiled Javascript coverage.

## Production
> All build tasks will run the `gulp test`, the bundle will only be created if the test passed.

You can create production build by running:
```bash
gulp build
```
or you can create production build and then serve it using `live-server` by running:
```bash
gulp serve-build
```
It uses [SystemJS Builder](https://github.com/systemjs/builder) to bundle the application so it's ready for production use
