import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink, RouteDefinition} from '@angular/router-deprecated';
import {FORM_DIRECTIVES, Control} from '@angular/common';
import { GithubberService } from '../githubber/githubber.service';
// for the production
import { enableProdMode } from '@angular/core';
enableProdMode();

const ERR_NO_REPOS = 'User exists but has no repositories.';

@Component({
    selector: 'githubber-home',
    directives: [FORM_DIRECTIVES, RouterLink, CORE_DIRECTIVES],    
    templateUrl: 'app/home/home.html',  
    styleUrls: [
        'app/home/home.css'
    ],
    providers: [GithubberService],
})
export class HomeComponent {

    items: Array<any>;
    errorMessage: string;
    username: Control;
    @Input() routes: RouteDefinition[];

    constructor(private githubberService: GithubberService) {
        this.username = new Control();
        this.items = new Array<any>();
        
        this.username.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe(username => {
                if (username !== '') {
                    this.getRepositories(username);
                } else {
                    this.setItemsAndError([], '');
                }
            });
    }

    private getRepositories(username: string) {
        this.githubberService
            .getRepositories(username)
            .subscribe(
                data => {                            
                    if (data && data.length === 0) {
                        this.setItemsAndError([], ERR_NO_REPOS);
                    } else {
                        let mappedRepositories = data.map((fullRepository) => {
                            return {
                                name: fullRepository.full_name,
                                url: fullRepository.html_url
                            };
                        });
                        this.setItemsAndError(mappedRepositories, '');
                    }
                },
                error => {
                    this.setItemsAndError([], error);
                }
            );
    }

    private setItemsAndError(items: Array<any>, error: string) {
        this.items = items;
        this.errorMessage = error;
    }
}

