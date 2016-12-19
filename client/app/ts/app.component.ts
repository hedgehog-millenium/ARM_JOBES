import {Component} from 'angular2/core';
import {JobService} from './jobs.servise';

@Component({
    selector: 'my-app',
    template: `<h1>Angular 2 says: Hello {{name}}</h1>
                <ul>
                    <li *ngFor="#jobLink of jobLinks">{{jobLink}}</li>
                </ul>
                `,
    providers:[JobService]
})

export class AppComponent {
    name:string = 'Blant';
    jobLinks:string[];

    constructor(private jobService:JobService){
        console.log('AppComponent constructor is running');
        this.jobLinks = jobService.getJobLinks();
    }
}
