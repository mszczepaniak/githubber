import {Component, Input} from '@angular/core';

@Component({
    selector: 'githubber-navbar',
    templateUrl: 'app/navbar/navbar.html',
    styleUrls: [
        'app/navbar/navbar.css'
    ]
})

export class NavbarComponent {
    @Input() brand: string;
}
