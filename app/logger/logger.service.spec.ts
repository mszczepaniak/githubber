import {
    it,
    inject,
    describe,
    expect,
    beforeEach,
    beforeEachProviders
} from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('AppComponent', () => {
    beforeEachProviders(() => [LoggerService]);
    beforeEach(() => {
        spyOn(console, 'warn');
    });

    it('should log messages', inject([LoggerService], (logger) => {
        let message = 'Hello';
        logger.log(message);
        expect(console.warn).toHaveBeenCalledWith(message);
    }));

    beforeEach(() => {
        spyOn(console, 'error');
    });

    it('should log errors', inject([LoggerService], (logger) => {
        let message = 'Error: Hello';
        logger.log(message);
        expect(console.error).toHaveBeenCalledWith(message);
    }));
});
