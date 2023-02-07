
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const MyHeader = () =>{
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("wanted-login")){
            setIsLogin(true);
        }
    },[]);


    function logout(){
        localStorage.removeItem("wanted-login");
        setIsLogin(false);
        navigate("/");
    }

    return  (
        <Nav className='m-3'>
            
            <Nav.Item>
                <Nav.Link href="/">홈</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/todo">할 일</Nav.Link>
            </Nav.Item>
            {
                isLogin?
                <Nav.Item>
                    <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                </Nav.Item>
                :
                <>
                <Nav.Item>
                    <Nav.Link href="/signin">로그인</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/signup">회원가입</Nav.Link>
                </Nav.Item>
                </>
            }
        </Nav>
    );
}

export default MyHeader;