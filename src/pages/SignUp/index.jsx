import { useState, useEffect } from "react";
import SignForm from "../../components/SignForm";
import { myAxios } from "../../lib/myAxios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

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
        try{
            let result = await myAxios.post("/auth/signup", {email:email, password:password});

            console.log("회원가입 성공");
            navigate("/signin");

        }catch(e){
            console.log("회원가입에 실패하였습니다. 아이디 및 비밀번호를 확인해주세요.");
        }
        
    }

    return (
        <Card className="p-3 m-3">
            <h2>회원가입</h2>
            <br/>
            <Form>
            <SignForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} setIsValidEmail={setIsValidEmail} setIsValidPassword={setIsValidPassword}/>
            <Button disabled={!(isValidEmail&isValidPassword)} onClick={()=>{signUp()}}>회원가입</Button>
            </Form>
        </Card>
    );
}

export default SignUp;