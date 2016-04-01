import {Injectable} from 'angular2/core'
import {TodoModel} from './todo-model';

@Injectable()
export class TodoService{

    todos:TodoModel[] = [
        new TodoModel("First") ,
        new TodoModel("Second") ,
        new TodoModel("Third")
    ] ;


    addToTodos(todo: TodoModel){
        //new array, spread operator ... copy all todos and add a new todo to the end of array
        //reference is changing , the search pipe is working now
        this.todos = [...this.todos, todo];

    }
}
