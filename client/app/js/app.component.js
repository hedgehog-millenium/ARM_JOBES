System.register(['angular2/core', './jobs.servise'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, jobs_servise_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (jobs_servise_1_1) {
                jobs_servise_1 = jobs_servise_1_1;
            }],
        execute: function() {
            //import {JobMetadata} from '../../model/JobMetadata';
            AppComponent = (function () {
                function AppComponent(jobService) {
                    var _this = this;
                    this.jobService = jobService;
                    this.name = 'Samvel';
                    console.log('AppComponent constructor is running');
                    this.jobService.getJobLinks().subscribe(function (jobs) {
                        _this.jobsMetaData = jobs;
                        _this.parsedJobsCount = _this.jobsMetaData.filter(function (v) { return v.isParsed; }).length;
                    });
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        //templateUrl: '../../views/templates/template.jobListView.html',    
                        templateUrl: '../../views/templates/template.jobTableView.html',
                        styles: [".btn-action{border-radius:0!important;width:60px;-webkit-transition:all 0.5s ease-out;-o-transition:all 0.5s ease-out;transition:all 0.5s ease-out}\n             .btn-action:hover{color:rgb(117, 69, 69);}\n             .no-padding{padding:0!important;}\n             .box-25-25{height:25px;width:25px;}\n             .border-rad-0{border-radius:0;}\n             .blink_me:hover{animation:blinker 3s linear infinite}@keyframes blinker{50%{opacity:0}}"],
                        providers: [jobs_servise_1.JobService]
                    }), 
                    __metadata('design:paramtypes', [jobs_servise_1.JobService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map