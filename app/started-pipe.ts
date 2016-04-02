//Use this to create your own pipes/filters

import {Pipe} from 'angular2/core';

@Pipe({
    name: "started"
})

export class StartedPipe{

//this is always static, we need to update this somehow
//pipes accept arguments
    transform(value, [status]){
        // return value ;
        console.log("status is :" + status);
        return value.filter((item) => item.status === status) ;
    }

}
