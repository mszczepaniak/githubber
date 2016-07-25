import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

const ERR_NO_USER = 'This User does not exist in github database.';
const ERR_SERVER_INT = 'There is a problem with Github API.';
const ERR_SERVER = 'Server error.';
const API_URL = 'https://api.github.com/users';

@Injectable()
export class GithubberService {


  constructor(private http: Http) {}

  getRepositories (username: string): Observable<any> {
    let endpoint = `${API_URL}/${username}/repos`;
    return this.http.get(endpoint)
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData (res: Response) {

    let fullRepositories = res.json();
    
    return fullRepositories || {};
  }

  private handleError (error: any) {

    let errorMessage;

    if (error.status && error.status === 404) {
        errorMessage = ERR_NO_USER;
    } else if (error.status && error.status === 500) {
        errorMessage = ERR_SERVER_INT;
    } else {
        errorMessage = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : ERR_SERVER;
    }
    return Observable.throw(errorMessage);
  }
}
