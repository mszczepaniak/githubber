import {GithubberService} from './githubber.service';
import {
  it,
  describe,
  expect,
  inject,
  fakeAsync,
  tick,
  beforeEachProviders
} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {provide} from '@angular/core';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';

describe('GithubberService', () => {
  beforeEachProviders(() => [
      GithubberService,
      BaseRequestOptions,
      MockBackend,
      
      provide(Http, {
        useFactory: (backend: ConnectionBackend,
                     defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
      }, deps: [MockBackend, BaseRequestOptions]}),
    ]);

  // sets up an expectation that the correct URL will being requested
  function expectURL(backend: MockBackend, url: string, response: ResponseOptions) {
    backend.connections.subscribe(c => {
      expect(c.request.url).toBe(url);
      c.mockRespond(new Response(response));
    });
  }

  describe('getResponse with repo', () => {
    it('retrieves responses using the username',
      inject([GithubberService, MockBackend], fakeAsync((svc, backend) => {
        let res;
        let response = new ResponseOptions({body: '{"id": 29778216,"full_name": "mszczepaniak/Algorithms", "html_url": "https://github.com/mszczepaniak/Algorithms"}'});
        expectURL(backend, 'https://api.github.com/users/mszczepaniak/repos', response);
        svc.getRepositories('mszczepaniak').subscribe((_res) => {
          res = _res;
        });
        tick();
        expect(res.full_name).toBe('mszczepaniak/Algorithms');
      }))
    );
  });

  describe('gets empty repository', () => {
    it('retrieves responses using the username',
      inject([GithubberService, MockBackend], fakeAsync((svc, backend) => {
        let res;
        let response = new ResponseOptions({body: '{}'});
        expectURL(backend, 'https://api.github.com/users/dwer/repos', response);
        svc.getRepositories('dwer').subscribe((_res) => {
          res = _res;
        });
        tick();
        expect(res).toEqual({});
      }))
    );
  });

  describe('gets not found', () => {
    it('retrieves responses using the username that does not exist',
      inject([GithubberService, MockBackend], fakeAsync((svc, backend) => {
        let res;
        let response = new ResponseOptions({body: '{"message": "Not Found", "documentation_url": "https://developer.github.com/v3"}'});
        expectURL(backend, 'https://api.github.com/users/dwer123/repos', response);
        svc.getRepositories('dwer123').subscribe((_res) => {
          res = _res;
        });
        tick();
        expect(res).toEqual({"message": "Not Found", "documentation_url": "https://developer.github.com/v3"});
      }))
    );
  });

});
