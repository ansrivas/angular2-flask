import {Component, Input} from '@angular/core';
import {TodoService} from './todo-service';
import {TodoItemRenderer} from './todo-item-renderer';
import {SearchPipe} from './search-pipe';
import {StartedPipe} from './started-pipe';


@Component({
    selector:'todo-list',
    directives : [TodoItemRenderer],
    pipes : [SearchPipe,StartedPipe],
    template:`
    <div>
    <ul>
    <li *ngFor="#todo of todoservice.todos | started : status">
    <todo-item-renderer
    [todo] = "todo"
    (toggle) = "todoservice.toggleTodo($event)"
    > </todo-item-renderer>
    </li>
    </ul>
    </div>`

})

export class TodoList{
    //Now I need to get this string from so as to pass to the application
    @Input() status ;
    constructor(public todoservice:TodoService){
    }
}
