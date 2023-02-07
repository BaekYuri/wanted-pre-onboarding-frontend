import { useState } from "react";
import {Form, Button, ListGroupItem, InputGroup} from "react-bootstrap";

const TodoItem = (props)=>{    
    const {todoItem, idx, updateTodo, deleteTodo} = props;

    let [visible, setVisible] = useState(true);
    let [modifyTodo, setModifyTodo] = useState(todoItem.todo);

    return (
        <ListGroupItem>
                <InputGroup>
                    <Form.Check inline type="checkbox" checked={todoItem.isCompleted} onChange={(e)=>{updateTodo(todoItem.id, todoItem.todo, Boolean(e.target.checked), idx);}}/>
                {
                    visible?
                    
                <>
                    <span className="form-control" style={{border:"1px solid white"}}>{todoItem.todo}</span>
                    
                    <Button variant="primary" data-testid="modify-button" onClick={()=>{setVisible(!visible);}}>수정</Button>
                    <Button variant="danger" data-testid="delete-button" onClick={()=>{deleteTodo(todoItem.id, idx);}}>삭제</Button>
                </>
                    :
                    <>
                    <Form.Control data-testid="modify-input" defaultValue={modifyTodo} onChange={(e)=>{setModifyTodo(e.target.value);}} />
                    <Button variant="success" data-testid="submit-button" 
                        onClick={()=>{
                            updateTodo(todoItem.id, modifyTodo, todoItem.isCompleted, idx);
                            setVisible(!visible);
                            }}>제출</Button>
                    <Button variant="secondary" data-testid="cancel-button" 
                        onClick={()=>{
                            setVisible(!visible);
                            setModifyTodo(todoItem.todo);
                            }}>취소</Button>
                    </>
                }
                </InputGroup>
            
        </ListGroupItem>
    );
}

export default TodoItem;