import { useState, useEffect } from "react";
import SignForm from "../../components/SignForm";
import { myAxios } from "../../lib/myAxios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SignUp = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(false);

    useEffect(()=>{

        if(localStorage.getItem("wanted-login")){
            navigate("/todo");
        }
        
    }, []);

    async function signUp(){
        let result = await myAxios.post("/auth/signup", {email:email, password:password})

        if(result.status===201){
            console.log("회원가입 성공");
            navigate("/signin");
        }else{
            console.log("회원가입에 실패하였습니다. 아이디 및 비밀번호를 확인해주세요.");
        }
    }

    return (
        <div className="p-3">
            <h1>회원가입</h1>
            <br/>
            <Form>
            <SignForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} setIsValidEmail={setIsValidEmail} setIsValidPassword={setIsValidPassword}/>
            <Button disabled={!(isValidEmail&isValidPassword)} onClick={()=>{signUp()}}>회원가입</Button>
            </Form>
        </div>
    );
}

export default SignUp;