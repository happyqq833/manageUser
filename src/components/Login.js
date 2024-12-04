import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const isLoading = useSelector( state => state.user.isLoading);
    const account = useSelector (state => state.user.account);
    const handlePressEnter = (event) => {
        if (event.key === "Enter"){
            handleLogin();
        }
    }
    
    const handleLogin = async() => {
        if(!email || !password){
            toast.error("Email/Password is required!");
            return;
        }
        dispatch(handleLoginRedux(email, password));
        

    }

    const handleBack = () => {
        navigate("/");
    }
    
    useEffect(() => {
        if(account && account.auth == true){
            navigate("/");
        }
    }, [account])

    return(
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Login</div>
                <div className="text">Email or username</div>
                <div>
                    <input
                    type="text" 
                    placeholder="Email or username..."
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}/>
                </div>
                
                <div className="input-2">
                    <input 
                    type={isShowPassword === true ? "text" : "password"}
                    placeholder="Password..."
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                    onKeyDown={(event) => handlePressEnter(event)}/>
                    <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash" } 
                    onClick={() => setIsShowPassword(!isShowPassword)}></i>
                </div>
                
                <button 
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin(email, password)
                }>
                    {isLoading && <i className="fa-solid fa-refresh fa-spin"></i>}
                     &nbsp; Login
                     </button>
                <div className="back">
                    <i className="fa-solid fa-angles-left"></i>
                    <span onClick={() => handleBack()}> &nbsp;Go back</span>
                    </div>
            </div>
        </>
    )
}

export default Login;