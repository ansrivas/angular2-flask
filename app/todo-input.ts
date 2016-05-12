import {Component} from "@angular/core"
import {TodoService} from './todo-service';
import {TodoModel} from './todo-model';
import {TodoFilter} from './filter-pipe';

@Component({
    selector:'todo-input',
    template : `<div>
    Add todos
    <section>
    <form (submit)="onClick()">
    <input type="text" [(ngModel)]="todoModel.title" >
    </form>
    </section>
    {{values}}
    </div>`,
    directives: [TodoFilter]
})

export class TodoInput {
    todoModel : TodoModel = new TodoModel();
    values:string = '';
    constructor(public todoservice: TodoService){

    }
    onClick(){
        //another way : <button (click)="onClick()">Add</button>
        this.todoservice.addToTodos(this.todoModel);
        console.log(this.todoservice);
        this.todoModel = new TodoModel();
    };

}
