
export class TodoModel{
    status: string = "Started";
    constructor(public title:string =""){
    }

    toggle(){
        this.status =this.status == "completed" ? "Started" : "completed" ;
    };
}
