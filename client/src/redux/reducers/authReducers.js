const initialState = {
    token:localStorage.getItem("token"),
    isAuthenticated:false,
    user:null,
};

const authReducers=(state={...initialState},actions)=>{
    switch(actions.type){
        case 'LOGIN_SUCCESS':
       
            return{
                ...state,
                user:actions.user,
                token:actions.token,
                isAuthenticated:true,
            }
        case 'LOGGED_IN':
            return{
                ...state,
                user:actions.user,
                token:actions.token,
                isAuthenticated:true,
                
            }

        case 'SIGNOUT':
            return state;
        case 'LOGGED_OUT':
            return{
                ...state,
                user:null,
                token:null,
                isAuthenticated:false,
                

            }   
        case "PROFILE_UPDATE":
            return {
                ...state,
                user:actions.data
            }
        default:
            return state;
    }
}

export default authReducers;