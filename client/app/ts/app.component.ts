import {Component} from 'angular2/core';
import {JobService} from './jobs.servise';
//import {JobMetadata} from '../../model/JobMetadata';

@Component({
    selector: 'my-app',
    //templateUrl: '../../views/templates/template.jobListView.html',    
    templateUrl: '../../views/templates/template.jobTableView.html',   
    styles:['.background-danger{background:#cc6666;color:#fff;}'], 
    providers:[JobService]
})

export class AppComponent {
    name:string = 'Samvel';
    jobsMetaData:any[];

    constructor(private jobService:JobService){
        console.log('AppComponent constructor is running');
        this.jobService.getJobLinks().subscribe( jobs => {
                this.jobsMetaData = jobs;   
        });
    }
}
