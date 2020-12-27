import axios from 'axios';
import {BASE_URL} from '../../utils/constants';
import base64 from 'base-64';



export const NEW_DONATION=(data)=>{
    return (dispatch,getState)=>{
        dispatch({type:'TOGGLE_DROP'});
        axios.post(BASE_URL+'/donate',data,{headers:{'Content-Type': 'application/json',token:localStorage.getItem("jwt")}})
    .then(res=>{
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"New Donation Added!",snackbarType:"success"});
       dispatch({type:'TOGGLE_DROP'}); 
       dispatch({type:'DONATION_MODAL'}); 
       dispatch({type:'NEW_DONATIONS',donations:res.data}); 
         setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
        
    })
    .catch(error=>{
    	  dispatch({type:'TOGGLE_DROP'});
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"Something went wrong! Try Again",snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    });
        
    }
}

export const GET_DONATIONS=(data)=>{
    return (dispatch,getState)=>{
        axios.get(BASE_URL+'/donate',{headers:{'Content-Type': 'application/json','token':localStorage.getItem("jwt")}})
    .then(res=>{
       dispatch({type:'GET_DONATIONS',donations:res.data}); 
        
    })
    .catch(error=>{
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"Something went wrong! Reload",snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    });
        
    }
}

export const UPDATE_DONATION=(data)=>{
    return (dispatch,getState)=>{
        dispatch({type:'TOGGLE_DROP'});
        axios.put(BASE_URL+'/donate',data,{headers:{'Content-Type': 'application/json',token:localStorage.getItem("jwt")}})
    .then(res=>{
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"Details Updated!",snackbarType:"success"});
       dispatch({type:'TOGGLE_DROP'});  
       dispatch({type:'UPDATE_DONATIONS',donations:{...res.data,name:data.name,category:data.category,quantity:data.quantity,expiry:data.expiry}}); 
         setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
        
    })
    .catch(error=>{
        dispatch({type:'TOGGLE_DROP'});
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"Something went wrong! Try Again",snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    });
        
    }
}

export const DELETE_DONATION=(id)=>{
    return (dispatch,getState)=>{
        dispatch({type:'TOGGLE_DROP'});
        axios.delete(BASE_URL+'/donate?id='+id,{headers:{'Content-Type': 'application/json',token:localStorage.getItem("jwt")}})
    .then(res=>{
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"Medicine Donation Deleted!",snackbarType:"success"});
       dispatch({type:'TOGGLE_DROP'}); 
       dispatch({type:'REMOVE_DONATIONS',id:id}); 
         setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
        
    })
    .catch(error=>{
        dispatch({type:'TOGGLE_DROP'});
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"Something went wrong! Try Again",snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    });
        
    }
}

export const GET_ALL_DONATIONS=(data)=>{
    return (dispatch,getState)=>{
        axios.get(BASE_URL+'/donate_all',{headers:{'Content-Type': 'application/json','token':localStorage.getItem("jwt")}})
    .then(res=>{
       dispatch({type:'GET_DONATIONS',donations:res.data}); 
        
    })
    .catch(error=>{
       dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"Something went wrong! Reload",snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
    });
        
    }
}