import { useState, useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { myAxios } from "../../lib/myAxios";
import TodoItem from "../../components/TodoItem";
import { Form, Button, ListGroup, InputGroup } from "react-bootstrap";

const Todo = ()=>{
    const navigate = useNavigate();
    let [todos, setTodos] = useState(new Array());
    let [newTodo, setNewTodo] = useState("");

    useEffect(()=>{

        if(!localStorage.getItem("wanted-login")){
            navigate("/signin");
        }else{
            getTodos();
        }
        
    }, []);


    async function createTodo(todo){
        let result = await myAxios.post("/todos",
        {
            todo:todo
        },
        {
            headers:{
                Authorization:`bearer ${localStorage.getItem("wanted-login")}`,
            }
        }
        );

        if(result.status===201){
            console.log("생성되었습니다.");
            setTodos([...todos, result.data]);
            
        }
    
    }

    async function getTodos(){
        let result = await myAxios.get("/todos",
        {
            headers:{
                Authorization:`bearer ${localStorage.getItem("wanted-login")}`,
            }
        }
        );

        if(result.status===200){
            setTodos(result.data);
        }

    }

    async function updateTodo(id, todo, isCompleted, idx){
        let result = await myAxios.put(`/todos/${id}`,
        
        {
            todo:todo,
            isCompleted:isCompleted,
            
        },
        {
            headers:{
                Authorization:`bearer ${localStorage.getItem("wanted-login")}`,
            },
        },
        );

        if(result.status===200){
            console.log("수정 성공");
            let tempTodo = [...todos];
            tempTodo[idx] = result.data;
            console.log(tempTodo);
            setTodos(tempTodo);
        }
    }

    async function deleteTodo(id, idx){
        let result = await myAxios.delete(`/todos/${id}`,
        {
            headers:{
                Authorization:`bearer ${localStorage.getItem("wanted-login")}`,
            }
        });

        if(result.status===204){
            console.log("삭제 성공");
            let tempTodo = [...todos];
            tempTodo.splice(idx, 1);
            setTodos(tempTodo);
        }
    }

    return (
        <div className="p-3">
            <Form>
                <InputGroup className="mb-3">
                    <Form.Control data-testid="new-todo-input" defaultValue={newTodo} onChange={(e)=>{setNewTodo(e.target.value)}}/>
                    <Button variant="dark" data-testid="new-todo-add-button" onClick={()=>{createTodo(newTodo)}}>추가</Button>
                </InputGroup>
            </Form>
            <ListGroup>
            {
                todos.map((item, idx)=><TodoItem idx={idx} todoItem={item} key={idx} updateTodo={updateTodo} deleteTodo={deleteTodo}/>)
            }
            </ListGroup>
        </div>

    );
}

export default Todo;