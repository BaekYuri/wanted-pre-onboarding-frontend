import { useState, useEffect } from "react";
import SignForm from "../../components/SignForm";
import { myAxios } from "../../lib/myAxios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

const SignIn = (props) =>{
    const {setIsLogin} = props;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(false);
    
    useEffect(()=>{

        if(localStorage.getItem("wanted-login")){
            setIsLogin(true);
            navigate("/todo");
        }

    }, []);

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

    return (
        <Card className="p-3 m-3">
            <h2>로그인</h2>
            <br/>
            <Form>
            <SignForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} setIsValidEmail={setIsValidEmail} setIsValidPassword={setIsValidPassword}/>
            <Button disabled={!(isValidEmail&isValidPassword)} onClick={()=>{signIn()}}>로그인</Button>
            </Form>
        </Card>

    );
}
export default SignIn;