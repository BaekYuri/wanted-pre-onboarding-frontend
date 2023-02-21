# 프로젝트 실행 방법
1. git clone
2. 터미널에 아래 명령어 입력
```
cd {프로젝트 경로}
npm install
npm start
```

# 배포 링크
[링크](https://thisisdumpling.life/)

# 사용한 라이브러리
- React Router
- Axios
- React Bootstrap

# 요구사항 구현
## 1. 로그인 / 회원가입 
- 로그인 / 회원가입 페이지에서 email, password 입력하는 폼을 재사용할 수 있다고 생각하여 SignForm 컴포넌트를 따로 만듬
- Assignment 1 (회원가입 및 로그인 페이지 email, password 유효성 검사)
    - useState를 이용해 email, password의 값 관리
        - state는 부모 컴포넌트(pages/Signin, pages/SignUp)에서 props로 전달하여서 사용
    - SignForm에 입력되는 email, password의 value가 변경될 때 마다 setState를 이용해 값 변경
    ```
    // ./src/components/SignForm/index.jsx

    function changeEmail(e){
        setEmail(e.target.value);
    }

    function changePassword(e){
        setPassword(e.target.value);
    }
    ```
    - 유효성 검사 (email)
        - charAt을 사용해 한글자씩 확인해보고 @가 있으면 true 반환, 없으면 false
    ```
    // ./src/components/SignForm/index.jsx

    function validateEmail(email){
        let haveAt = false;
        for(let i=0; i<email.length;i++){
            if(email.charAt(i)==='@'){
                haveAt = true;
                break;
            }
        }
        return haveAt;
    }
    ```
    - 유효성 검사 (password)
        - length가 8 이상이면 true 반환, 아니면 false 반환
    ```
    // ./src/components/SignForm/index.jsx

    function validatePassword(password){
        if(password.length>=8) return true;
        return false;
    }
    ```
    - useEffect를 이용해 state인 email과 password가 변경될 때 마다 isValidEmail, isValidPassword 변경함. 변경한 후 isValidEmaill&&isValidPassword 가 true일 때 로그인 및 회원가입 버튼 활성화
    ```
    // ./src/components/SignForm/index.jsx

    useEffect(()=>{
        setIsValidEmail(validateEmail(email));
    }, [email]);

    useEffect(()=>{
        setIsValidPassword(validatePassword(password));
    }, [password]);
    ```
    ```
    // ./src/pages/SignIn/index.jsx

    <Button disabled={!(isValidEmail&isValidPassword)} onClick={()=>{signIn()}}>로그인</Button>

    // ./src/pages/SignUp/index.jsx

    <Button disabled={!(isValidEmail&isValidPassword)} onClick={()=>{signUp()}}>회원가입</Button>
    ```
- Assignment 2 (회원가입 성공 시 로그인 페이지로 이동)
    - try/catch 이용하여 axios 요청 성공했을 때만 useNavigate 이용하여 라우터 이동
    ```
    // ./src/pages/SignUp/index.jsx

    async function signUp(){
        try{
            let result = await myAxios.post("/auth/signup", {email:email, password:password});

            console.log("회원가입 성공");
            navigate("/signin");

        }catch(e){
            console.log("회원가입에 실패하였습니다. 아이디 및 비밀번호를 확인해주세요.");
        }
        
    }
    ```
- Assignment 3 (로그인 성공 시 투두페이지로 이동, JWT 로컬스토리지 저장)
    - try/catch 이용해 axios 요청 성공했을 때 로컬스토리지에 JWT 저장
    - 저장 후 useNavigate 이용해 투두페이지 이동
    ```
    // ./src/pages/SignIn/index.jsx

    async function signIn(){
        try{
            let result = await myAxios.post("/auth/signin", {email:email, password:password});

            console.log("로그인 되었습니다.");
            localStorage.setItem("wanted-login", result.data.access_token);
            setIsLogin(true);
            navigate("/todo");
        }catch(e){
            console.log("아이디와 비밀번호를 확인해주세요.");
        }
        
    }
    ```
- Assignment 4 (로그인 여부에 따른 리다이렉트 처리)
    - useEffect에 빈 배열을 넣고 로컬스토리지에 토큰 여부 확인 (처음에 페이지 렌더링 될때만 실행됨)
    - 토큰 여부에 따라 redirect 처리
    ```
    // ./src/pages/SignIn/index.jsx

    useEffect(()=>{

        if(localStorage.getItem("wanted-login")){
            navigate("/todo");
        }
        
    }, []);
    
    // ./src/pages/Todo/index.jsx

    useEffect(()=>{

        if(!localStorage.getItem("wanted-login")){
            navigate("/signin");
        }else{
            getTodos();
        }
        
    }, []);
    ```
    
## 2. TODO LIST
    
- Assignment 5 (투두리스트 목록 확인)
    - 투두리스트의 할일들은 여러번 반복될 수 있으므로 따로 컴포넌트로 작성
    - 전체 투두 배열(todos)과 http 요청 관련 함수는 부모 컴포넌트에서 가지고 있고 자식 컴포넌트한테 props로 전달하여 사용
    - /todo에 접속하고 로그인 토큰이 존재한다면 getTodos()로 목록 받아오기
    - axios 요청 성공하면 받아온 데이터를 todos에 저장
    ```
    // ./src/pages/Todo/index.jsx

    useEffect(()=>{

        if(!localStorage.getItem("wanted-login")){
            navigate("/signin");
        }else{
            getTodos();
        }
        
    }, []);

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
    ```
- Assignment 6 (TODO 추가 input 및 button).
    - input에 값(newTodo)을 입력하고 추가 버튼을 누르면 createTodo 함수 실행
    - axios 정상적으로 실행되면 setTodos([...todos, result.data]) 실행
        - state의 변화를 감지하고 재렌더링 하기 때문에 기존의 메모리 주소를 참조하는 배열 말고 새로운 메모리 주소를 가지고 있는 배열이 필요
    ```
    // ./src/pages/Todo/index.jsx

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

    ...중략
    
        <Form>
            <InputGroup className="mb-3">
                <Form.Control data-testid="new-todo-input" defaultValue={newTodo} onChange={(e)=>{setNewTodo(e.target.value)}}/>
                <Button variant="dark" data-testid="new-todo-add-button" onClick={()=>{createTodo(newTodo)}}>추가</Button>
            </InputGroup>
        </Form>

    ...
    ```
- Assignment 7 (체크박스 변경될 때마다 완료 여부 수정)
    - 체크박스의 onChange 이벤트가 발생할 때 마다 updateTodo(todoItem.id, todoItem.todo, Boolean(e.target.checked), idx) 실행
    - id와 idx(배열의 몇번째에 있는지)는 다르기 때문에 idx에 있는 값을 변경
    - e.target.checked의 type이 string이여서 boolean으로 형변환
    ```
    // ./src/pages/Todo/index.jsx

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

    // ./src/components/TodoItem/index.jsx

    <Form.Check inline type="checkbox" checked={todoItem.isCompleted} onChange={(e)=>{updateTodo(todoItem.id, todoItem.todo, Boolean(e.target.checked), idx);}}/>
    ```
- Assignment 8 ~ 10 (수정 및 삭제 기능)
    - 수정 버튼을 누르면 visible 상태가 false로 변경되고 input과 제출 취소 버튼이 생김
    - 제출을 누르면 input의 value와 현재 todo의 id, isCompleted의 값을 이용해 update
    - 취소를 누르면 input값은 다시 visible은 true가 되고 input값도 원래 todo값으로 변경
    - 삭제를 누르면 deleteTodo(id, idx)
    ```
    // ./src/components/TodoItem/index.jsx

    import { useState } from "react";
    import {Form, Button, ListGroupItem, InputGroup} from "react-bootstrap";

    const TodoItem = (props)=>{    
        const {todoItem, idx, updateTodo, deleteTodo} = props;

        let [visible, setVisible] = useState(true); // 수정 버튼이 보이는지 변수
        let [modifyTodo, setModifyTodo] = useState(todoItem.todo); //수정 input 받는 변수

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
    ```
    ```
    // ./src/pages/Todo/index.jsx

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
    ```
