import {useEffect} from "react";
import Form from 'react-bootstrap/Form';

const SignForm = (props)=>{
    let {email, setEmail, password, setPassword, setIsValidEmail, setIsValidPassword} = props;

    useEffect(()=>{
        setIsValidEmail(validateEmail(email));
    }, [email]);

    useEffect(()=>{
        setIsValidPassword(validatePassword(password));
    }, [password]);


    function changeEmail(e){
        setEmail(e.target.value);
    }

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

    function changePassword(e){
        setPassword(e.target.value);
    }

    function validatePassword(password){
        if(password.length>=8) return true;
        return false;
    }

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>e-mail</Form.Label>
                <Form.Control id="email" data-testid="email-input" defaultValue={email} onChange={(e)=>{changeEmail(e)}}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>password</Form.Label>
                <Form.Control id="password" type="password" data-testid="password-input" defaultValue={password} onChange={(e)=>{changePassword(e)}}/>
            </Form.Group>
        </>
    );
}

export default SignForm;