import { useState, useEffect } from "react";
import SignForm from "../../components/SignForm";
import { myAxios } from "../../lib/myAxios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SignIn = () =>{
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

    async function signIn(){
        let result = await myAxios.post("/auth/signin", {email:email, password:password})

        if(result.status===200){
            console.log("로그인 성공", result);
            localStorage.setItem("wanted-login", result.data.access_token);
            navigate("/todo");
        }else{
            console.log("아이디와 비밀번호를 확인해주세요.");
        }
    }

    return (
        <div className="p-3">
            <h1>로그인</h1>
            <br/>
            <Form>
            <SignForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} setIsValidEmail={setIsValidEmail} setIsValidPassword={setIsValidPassword}/>
            <Button disabled={!(isValidEmail&isValidPassword)} onClick={()=>{signIn()}}>로그인</Button>
            </Form>
        </div>

    );
}
export default SignIn;