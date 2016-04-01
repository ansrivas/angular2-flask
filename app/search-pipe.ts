//Use this to create your own pipes/filters

import {Pipe} from 'angular2/core';

@Pipe({
    name: "search"
})

export class SearchPipe{

//this is always static, we need to update this somehow
    transform(value){
        // return value ;
        return value.filter((item) => item.title.startsWith('F')) ;
    }

}
