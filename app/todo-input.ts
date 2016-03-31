import {Component} from "angular2/core"
import {TodoService} from './todo-service';
@Component({
selector:'todo-input',
template : `<div>
My Todos
<section>
<form (submit)="onClick()">
<input type="text" [(ngModel)]="todoModel" >
</form>
</section>
 </div>`
})

export class TodoInput {
    todoModel : string ;
    constructor(public todoservice: TodoService){

    }
    onClick(){
        //another way : <button (click)="onClick()">Add</button>
        this.todoservice.todos.push(this.todoModel);
        console.log(this.todoservice);
        this.todoModel = "";
    }
}
