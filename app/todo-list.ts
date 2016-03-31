import {Component} from 'angular2/core';
import {TodoService} from './todo-service';

@Component({
    selector:'todo-list',
    template:`<div><ul>
        <li *ngFor="#todo of todoservice.todos">
            {{todo}}
        </li>
        </ul>
</div>`

})



export class TodoList{
    constructor(public todoservice:TodoService){
    }
}
