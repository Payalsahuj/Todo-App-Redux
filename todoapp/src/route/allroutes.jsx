
import {Routes,Route} from "react-router-dom"
import { Todo } from "../page/Todo"

export const Allroutes=()=>{
    return <Routes>
        <Route path="/" element={<Todo/>}/>
    </Routes>
}