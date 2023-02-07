import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        try{
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

            
            console.log("생성되었습니다.");
            setTodos([...todos, result.data]);
        }catch(e){
            console.log("생성에 실패하였습니다.");
        }
    
    }

    async function getTodos(){
        try{
            let result = await myAxios.get("/todos",
            {
                headers:{
                    Authorization:`bearer ${localStorage.getItem("wanted-login")}`,
                }
            }
            );
            setTodos(result.data);
        }catch(e){
            console.log("목록을 불러오는 데에 실패하였습니다.");
        }
        
    }

    async function updateTodo(id, todo, isCompleted, idx){
        try{
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

            console.log("수정 성공");
            let tempTodo = [...todos];
            tempTodo[idx] = result.data;
            setTodos(tempTodo);

        }catch(e){
            console.log("수정 실패");
        }
        

    }

    async function deleteTodo(id, idx){
        try{
            let result = await myAxios.delete(`/todos/${id}`,
            {
                headers:{
                    Authorization:`bearer ${localStorage.getItem("wanted-login")}`,
                }
            });

            
            console.log("삭제 성공");
            let tempTodo = [...todos];
            tempTodo.splice(idx, 1);
            setTodos(tempTodo);
        }catch(e){
            console.log("삭제 실패");
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