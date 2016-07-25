import {Injectable} from '@angular/core';

// For development = easy readible console messages

// For production in the future - move logs to files instead of console
@Injectable()
export class LoggerService {
    log(message: string): void {
        if (message.startsWith('Error')) {
            console.error(message);
        } else {
            console.warn(message);
        }

    }
}
