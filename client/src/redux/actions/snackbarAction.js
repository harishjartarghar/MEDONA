export const showSnackbarAction=(message , snackbarType)=>{
    return (dispatch,getState)=>{
    
        dispatch({type: 'SHOW_SNACKBAR', message ,snackbarType });
        setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },1500)
    }
}

export const showDropAction=(message , snackbarType)=>{
    return (dispatch,getState)=>{
    
        dispatch({type: 'SHOW_DROP'});
    }
}

export const hideDropAction=(message , snackbarType)=>{
    return (dispatch,getState)=>{
    
        dispatch({type: 'HIDE_DROP'});
    }
}




