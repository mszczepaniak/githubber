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
    ROUTER_PRIMARY_COMPONENT,
    ROUTER_PROVIDERS
} from '@angular/router-deprecated';
import {
    APP_BASE_HREF,
} from '@angular/common';
import { Component, provide, ApplicationRef } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { HomeComponent } from './home.component';
import {HTTP_PROVIDERS} from '@angular/http';

@Component({
    selector: 'githubber-test',
    template: `<div><githubber-home></githubber-home></div>`,
    directives: [HomeComponent],
    providers: [HTTP_PROVIDERS]
})

class TestComponent {
}

describe('HomeComponent', () => {
    beforeEachProviders(() => [
            ROUTER_PROVIDERS,
            provide(ROUTER_PRIMARY_COMPONENT, { useValue: HomeComponent }),
            provide(ApplicationRef, { useClass: MockApplicationRef }),
            provide(APP_BASE_HREF, { useValue: '/' }),
        ]);

    it('should have print "Search Me: " on template', async(inject([TestComponentBuilder],
    (tsb: TestComponentBuilder) => {
        tsb.createAsync(TestComponent).then((fixture) => {
            fixture.detectChanges();
            let compiled = fixture.debugElement.nativeElement;
            expect(compiled).toBeDefined();
            expect(compiled.querySelector('label'))
                .toHaveText('Search Me:');
        });
    })));

});
