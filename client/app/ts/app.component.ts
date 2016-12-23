import {Component} from 'angular2/core';
import {JobService} from './jobs.servise';
//import {JobMetadata} from '../../model/JobMetadata';

@Component({
    selector: 'my-app',
    //templateUrl: '../../views/templates/template.jobListView.html',    
    templateUrl: '../../views/templates/template.jobTableView.html',   
    styles:[`.btn-action{border-radius:0!important;width:60px;-webkit-transition:all 0.5s ease-out;-o-transition:all 0.5s ease-out;transition:all 0.5s ease-out}
             .btn-action:hover{color:rgb(117, 69, 69);}
             .no-padding{padding:0!important;}
             .box-25-25{height:25px;width:25px;}
             .border-rad-0{border-radius:0;}
             .blink_me:hover{animation:blinker 3s linear infinite}@keyframes blinker{50%{opacity:0}}`], 
    providers:[JobService]
})

export class AppComponent {
    name:string = 'Samvel';
    jobsMetaData:any[];
    parsedJobsCount:number;

    constructor(private jobService:JobService){
        console.log('AppComponent constructor is running');
        this.jobService.getJobLinks().subscribe( jobs => {
                this.jobsMetaData = jobs;   
                this.parsedJobsCount = this.jobsMetaData.filter(v=>v.isParsed).length;
        });
    }
}
