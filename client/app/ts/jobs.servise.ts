import {Injectable} from 'angular2/core';
import {Http,Headers} from 'angular2/http';

@Injectable() 
export class JobService{
    getJobLinks(){
        return ['Joblin1.am','Joblin2.am','Joblin3.am','Joblin4.am'];
    }
}