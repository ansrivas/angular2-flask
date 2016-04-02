import {Component, Output, EventEmitter}  from  'angular2/core' ;

@Component({
    selector : 'status-selector',
    template : `<div>
    <select #myselect (change)="selected.emit(myselect.value)">
    <option *ngFor= "#stats of statuses">
    {{stats}}
    </option>
    </select>
    </div>`
})

export class StatusSelector{
    //send out this status to the main file where from it travels everywhere

    //this name "selected" should be same as what you are using in the base template i.e. <status-selector>
    //this was a fuck up, keep in mind.
    @Output() selected  = new EventEmitter();

    statuses =["Started", "completed"];
    ngOnInit(){
        console.log('first emit' +this.statuses[0]);
        this.selected.emit(this.statuses[0]);
    }

}
