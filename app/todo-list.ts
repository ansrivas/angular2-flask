import {Component} from 'angular2/core';
import {TodoService} from './todo-service';
import {TodoItemRenderer} from './todo-item-renderer';
import {SearchPipe} from './search-pipe';

@Component({
    selector:'todo-list',
    directives : [TodoItemRenderer],
    pipes : [SearchPipe],
    template:`
    <div>
    <ul>
    <li *ngFor="#todo of todoservice.todos | search">
    <todo-item-renderer [todo] = "todo"> </todo-item-renderer>
    </li>
    </ul>
    </div>`

})

export class TodoList{
    constructor(public todoservice:TodoService){
    }
}
