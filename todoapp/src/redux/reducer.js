import {  ADDTODO, CLEARCOMPLETED, DELETEITEM, EDITITEM, EDITSTATUS } from "./actionType"


const initialstate={
   
    todos:[],
    active:[],
    complete:[]
}

export const reducer=(state=initialstate,action)=>{
    switch(action.type){
        case ADDTODO:{
            return {...state,todos:[...state.todos,action.payload]}
        }
        // case FILTERACTIVE:{
        //     return {...state,active:action.payload}
        // }
        // case FILTERCOMPLETE:{
        //     return {...state,complete:action.payload}
        // }
        case EDITSTATUS:{
            return {...state,todos:action.payload}
        }
        case CLEARCOMPLETED:{
            return {...state,todos:action.payload}  
        }
        case DELETEITEM:{
            return {...state,todos:action.payload}  

        }
        case EDITITEM:{
            return {...state,todos:action.payload}
        }
        default:{
            return {...state}
        }
    }
}


