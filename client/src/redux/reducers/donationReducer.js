const initialState={
        donations:[],
        donationModal:false
}

const donationReducers= (state = {...initialState}, action) => {
  switch (action.type) {
    case 'GET_DONATIONS':
      return {
        ...state,
        donations:action.donations
      }
     case 'NEW_DONATIONS':
      return {
        ...state,
        donations:[action.donations,...state.donations]
      }
   case 'DONATION_MODAL':
   return {
    ...state,
    donationModal:!state.donationModal
   }
   case 'REMOVE_DONATIONS':
   return {
    ...state,
    donations:state.donations.filter((item)=>item._id!=action.id)
   }
   case 'UPDATE_DONATIONS':
   return {
    ...state,
    donations:state.donations.map((item)=>{
      console.log(action.donations)
      if(item._id===action.donations._id) 
        return action.donations
      return item
    })
   }
    default:
      return state;
  }
};


export default donationReducers;