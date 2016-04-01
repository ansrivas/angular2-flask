import {Component} from "angular2/core"
import {TodoService} from './todo-service';
import {TodoModel} from './todo-model';

@Component({
    selector:'todo-input',
    template : `<div>
    My Todos
    <section>
    <form (submit)="onClick()">
    <input type="text" [(ngModel)]="todoModel.title" >
    </form>
    </section>
    </div>`
})

export class TodoInput {
    todoModel : TodoModel = new TodoModel();
    constructor(public todoservice: TodoService){

    }
    onClick(){
        //another way : <button (click)="onClick()">Add</button>
        this.todoservice.addToTodos(this.todoModel);
        console.log(this.todoservice);
        this.todoModel = new TodoModel();
    };

}
