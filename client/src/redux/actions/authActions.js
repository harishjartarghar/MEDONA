import axios from 'axios';
import {BASE_URL} from '../../utils/constants';
import base64 from 'base-64';



export const DONOR_INVITE=(email)=>{
    return (dispatch,getState)=>{
        dispatch({type:'TOGGLE_DROP'});
        axios.post(BASE_URL+'/auth/donor_email',{email:email},{headers:{'Content-Type': 'application/json'}})
    .then(res=>{
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"REGISTRATION LINK SENT",snackbarType:"success"});
       dispatch({type:'TOGGLE_DROP'}); 
       dispatch({type:'TOGGLE_MODAL'}); 
         setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
        
    })
    .catch(error=>{
       dispatch({type:'TOGGLE_DROP'});
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    });
        
    }
}


export const NGO_INVITE=(email,mobile)=>{
    return (dispatch,getState)=>{
       dispatch({type:'TOGGLE_DROP'});

        axios.post(BASE_URL+'/auth/ngo_email',{email:email,mobile:mobile},{headers:{'Content-Type': 'application/json'}})
    .then(res=>{
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"REGISTRATION LINK SENT",snackbarType:"success"});
       dispatch({type:'TOGGLE_DROP'});
       dispatch({type:'TOGGLE_MODAL'}); 

         setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    })
    .catch(error=>{
       dispatch({type:'TOGGLE_DROP'});
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    });
        
    }
}

export const DONOR_FORGOT_INVITE=(email)=>{
    return (dispatch,getState)=>{
       dispatch({type:'TOGGLE_DROP'});

        axios.post(BASE_URL+'/auth/donor_forgot_password',{email:email},{headers:{'Content-Type': 'application/json'}})
    .then(res=>{
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"RESET PASSWORD LINK SENT",snackbarType:"success"});
       dispatch({type:'TOGGLE_DROP'});
 

         setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    })
    .catch(error=>{
       dispatch({type:'TOGGLE_DROP'});
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    });
        
    }
}

export const NGO_FORGOT_INVITE=(email)=>{
    return (dispatch,getState)=>{
       dispatch({type:'TOGGLE_DROP'});

        axios.post(BASE_URL+'/auth/ngo_forgot_password',{email:email},{headers:{'Content-Type': 'application/json'}})
    .then(res=>{
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"RESET PASSWORD LINK SENT",snackbarType:"success"});
       dispatch({type:'TOGGLE_DROP'});
 

         setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    })
    .catch(error=>{
       dispatch({type:'TOGGLE_DROP'});
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    });
        
    }
}




export const DONOR_LOGIN=(email,password,type,props)=>{
    return (dispatch,getState)=>{
         dispatch({type:'TOGGLE_DROP'});
            axios.post(BASE_URL+'/auth/donor_login',{email,password},{headers:{'Content-Type': 'application/json'}})
            .then(res=>{
                localStorage.setItem("jwt", res.data.jwt);
                localStorage.setItem("user",JSON.stringify(res.data.donor));
                localStorage.setItem(base64.encode("type"),base64.encode(type));

                props.history.push('/dashboard');
                dispatch({type:'LOGIN_SUCCESS',token:res.data.jwt,user:res.data.donor});
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"LOGIN SUCCESS",snackbarType:"success"});
              
               setTimeout(()=>{
                
                dispatch({type:'TOGGLE_DROP'});
                dispatch({
                    type:"HIDE_SNACKBAR"
                })

        },2000)
                
                
            })
            .catch(error=>{
                console.log(error);
                  dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
                dispatch({type:'TOGGLE_DROP'});
                
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                dispatch({type:'LOGIN_ERROR',error});
            })
    }
}


export const DONOR_PROFILE=(data,props)=>{
    return (dispatch,getState)=>{
         dispatch({type:'TOGGLE_DROP'});

            axios.put(BASE_URL+'/auth/donor_profile',data,{headers:{'Content-Type': 'application/json',token:localStorage.getItem("jwt")}})
            .then(res=>{
                localStorage.setItem("user",JSON.stringify(res.data));
                dispatch({type:'PROFILE_UPDATE',data:res.data});
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"DETAILS UPDATED!",snackbarType:"success"});
              
               setTimeout(()=>{
                
                dispatch({type:'TOGGLE_DROP'});
                dispatch({
                    type:"HIDE_SNACKBAR"
                })

        },2000)
                
                
            })
            .catch(error=>{
                console.log(error);
                  dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
                dispatch({type:'TOGGLE_DROP'});
                
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                dispatch({type:'LOGIN_ERROR',error});
            })
    }
}

export const DONOR_PASSWORD=(password,props)=>{
    return (dispatch,getState)=>{
         dispatch({type:'TOGGLE_DROP'});

            axios.put(BASE_URL+'/auth/donor_password',{password},{headers:{'Content-Type': 'application/json',token:localStorage.getItem("jwt")}})
            .then(res=>{
                
                dispatch({type:'DONOR_PASSWORD'});
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"PASSWORD UPDATED!",snackbarType:"success"});
              
               setTimeout(()=>{
                
                dispatch({type:'TOGGLE_DROP'});
                dispatch({
                    type:"HIDE_SNACKBAR"
                })

        },2000)
                
                
            })
            .catch(error=>{
                console.log(error);
                  dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
                dispatch({type:'TOGGLE_DROP'});
                
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                dispatch({type:'LOGIN_ERROR',error});
            })
    }
}


export const DONOR_FORGOT_PASSWORD=(password,token,props)=>{
    return (dispatch,getState)=>{
         dispatch({type:'TOGGLE_DROP'});

            axios.put(BASE_URL+'/auth/donor_forgot_password',{password},{headers:{'Content-Type': 'application/json',token:token}})
            .then(res=>{
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"PASSWORD UPDATED!",snackbarType:"success"});
                props.history.push("/login");
               
               setTimeout(()=>{
                
                dispatch({type:'TOGGLE_DROP'});
                dispatch({
                    type:"HIDE_SNACKBAR"
                })

        },2000)
                
                
            })
            .catch(error=>{
                console.log(error);
                  dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"Link Expired!",snackbarType:"error"});
                    props.history.push("/login");
               setTimeout(()=>{
                dispatch({type:'TOGGLE_DROP'});
                
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                
            })
    }
}

export const NGO_FORGOT_PASSWORD=(password,token,props)=>{
    return (dispatch,getState)=>{
         dispatch({type:'TOGGLE_DROP'});

            axios.put(BASE_URL+'/auth/ngo_forgot_password',{password},{headers:{'Content-Type': 'application/json',token:token}})
            .then(res=>{
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"PASSWORD UPDATED!",snackbarType:"success"});
                props.history.push("/login");
               
               setTimeout(()=>{
                
                dispatch({type:'TOGGLE_DROP'});
                dispatch({
                    type:"HIDE_SNACKBAR"
                })

        },2000)
                
                
            })
            .catch(error=>{
                console.log(error);
                  dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
                dispatch({type:'TOGGLE_DROP'});
                
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                
            })
    }
}

export const NGO_LOGIN=(email,password,type,props)=>{
    return (dispatch,getState)=>{
         dispatch({type:'TOGGLE_DROP'});
            axios.post(BASE_URL+'/auth/ngo_login',{email,password},{headers:{'Content-Type': 'application/json'}})
            .then(res=>{
                localStorage.setItem("jwt", res.data.jwt);
                localStorage.setItem("user",JSON.stringify(res.data.donor));
                localStorage.setItem(base64.encode("type"),base64.encode(type));

                props.history.push('/dashboard');
                dispatch({type:'LOGIN_SUCCESS',token:res.data.jwt,user:res.data.donor});
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"LOGIN SUCCUESS",snackbarType:"success"});
              
               setTimeout(()=>{
                
                dispatch({type:'TOGGLE_DROP'});
                dispatch({
                    type:"HIDE_SNACKBAR"
                })

        },2000)
                
                
            })
            .catch(error=>{
                console.log(error);
                  dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
 dispatch({type:'TOGGLE_DROP'});
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                dispatch({type:'LOGIN_ERROR',error});
            })
    }
}

export const LOGOUT=(props)=>{
    return (dispatch,getState)=>{
        localStorage.clear();
       window.location.href='/login'
        dispatch({type:'LOGGED_OUT'});

    }
}

export const UPDATE_PROFILE=(imageUrl)=>{
    return (dispatch,getState)=>{
        const user=JSON.parse(localStorage.getItem("user"));
        user.profile=imageUrl;
        localStorage.setItem("user",JSON.stringify(user)); 
    axios.post('http://192.168.43.13:8080/api/user/newprofile',{imageUrl},{headers:{'Content-Type': 'application/json','auth-token':localStorage.getItem("jwt")}})
        console.log("cjeck",user);
        dispatch({type:'PROFILE_UPDATE',...user});
    }
}

export const CHECK_AUTH=()=>{
    return (dispatch,getState)=>{
        if(localStorage.getItem("jwt"))
        {
            const data={token:localStorage.getItem("jwt"),user:JSON.parse(localStorage.getItem("user"))}
            dispatch({type:'LOGGED_IN',...data});
        }
        else{
            dispatch({type:'LOGGED_OUT'});
        }
    }
}


export const NGO_PASSWORD=(password,props)=>{
    return (dispatch,getState)=>{
         dispatch({type:'TOGGLE_DROP'});

            axios.put(BASE_URL+'/auth/ngo_password',{password},{headers:{'Content-Type': 'application/json',token:localStorage.getItem("jwt")}})
            .then(res=>{
                
                dispatch({type:'NGO_PASSWORD'});
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"PASSWORD UPDATED!",snackbarType:"success"});
              
               setTimeout(()=>{
                
                dispatch({type:'TOGGLE_DROP'});
                dispatch({
                    type:"HIDE_SNACKBAR"
                })

        },2000)
                
                
            })
            .catch(error=>{
                console.log(error);
                  dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
                dispatch({type:'TOGGLE_DROP'});
                
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                dispatch({type:'LOGIN_ERROR',error});
            })
    }
}


export const NGO_PROFILE=(data,props)=>{
    return (dispatch,getState)=>{
         dispatch({type:'TOGGLE_DROP'});



            axios.put(BASE_URL+'/auth/ngo_profile',data,{headers:{'Content-Type': 'application/json',token:localStorage.getItem("jwt")}})
            .then(res=>{
                localStorage.setItem("user",JSON.stringify(data));
                dispatch({type:'PROFILE_UPDATE_NGO'});
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"DETAILS UPDATED!",snackbarType:"success"});
              
               setTimeout(()=>{
                
                dispatch({type:'TOGGLE_DROP'});
                dispatch({
                    type:"HIDE_SNACKBAR"
                })

        },2000)
                
                
            })
            .catch(error=>{
                console.log(error);
                  dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
                dispatch({type:'TOGGLE_DROP'});
                
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                dispatch({type:'LOGIN_ERROR',error});
            })
    }
}