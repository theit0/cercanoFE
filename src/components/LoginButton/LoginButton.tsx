import {useAuth0} from "@auth0/auth0-react";
import "./LoginButton.css"
const LoginButton = () => {
  
    const {loginWithRedirect} = useAuth0();


  return (
    <button className="login-button" onClick={()=>{
        loginWithRedirect({
            appState:{
                returnTo:'/pedidos', 
            }
        })
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-login-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg>
        Log In
    </button>
  )
}

export default LoginButton