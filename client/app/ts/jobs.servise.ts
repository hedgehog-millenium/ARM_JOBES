import {Injectable} from 'angular2/core';
import {Http,Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable() 
export class JobService{
        constructor(private http:Http) {        
        console.log('Job Servise Initialized...');
    }
    getJobLinks(){
        var url = 'http://localhost:3000/parser';        
        return this.http.get(url).map(res=>res.json());
    }
}