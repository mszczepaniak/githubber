import {
    it,
    expect,
    beforeEachProviders,
    inject,
    async,
    describe,
    MockApplicationRef
} from '@angular/core/testing';
import {
    TestComponentBuilder
} from '@angular/compiler/testing';
import {
    ROUTER_PRIMARY_COMPONENT,
    ROUTER_PROVIDERS
} from '@angular/router-deprecated';
import {
    APP_BASE_HREF,
} from '@angular/common';
import { Component, provide, ApplicationRef } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
    selector: 'githubber-test',
    template: '<div><githubber-app></githubber-app></div>',
    directives: [AppComponent]
})
class TestComponent {}

describe('AppComponent', () => {
    beforeEachProviders(() => [
        ROUTER_PROVIDERS,
        provide(ROUTER_PRIMARY_COMPONENT, { useValue: AppComponent }),
        provide(ApplicationRef, { useClass: MockApplicationRef }),
        provide(APP_BASE_HREF, { useValue: '/' }),
    ]);

    it('should have brand Githubber', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled).toBeDefined();
                expect(compiled.querySelector('a.navbar-brand'))
                    .toHaveText('Githubber');
            });
        })));
});
