import {Component, Input} from "@angular/core" ;

@Component({
    selector:'todo-filter',
    template : `      <form (submit)="onClick()">
        <input type="text" [(ngModel)]="todoModel.title" >
        </form>`
})
export class TodoFilter {
    @Input() todo ;
    values:string='Hello';

}
