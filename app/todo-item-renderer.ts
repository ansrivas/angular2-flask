import {Component, Input} from 'angular2/core' ;



@Component({
selector : 'todo-item-renderer',
template :`
    <style>
    .completed{
    text-decoration: line-through;
    }
    </style>
    <div>
    <span [ngClass]="todo.status"> {{todo.title }} </span>
    <button (click)="todo.toggle()">Mark done</button></div>`
})

export class TodoItemRenderer{
//Use this to pass some template values from one file to another
//<span [hidden]="todo.status == 'completed'"> {{todo.title}} </span>
//ngClass assigns a class to this span tag
@Input() todo ;

}
