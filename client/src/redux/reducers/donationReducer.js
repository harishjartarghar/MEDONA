const initialState={
        donations:[],
        donationModal:false,
        order:[],
        all:[],
        label1:[],
        data1:[],
        label2:[],
        data2:[],
        label3:[],
        data3:[],
        donor:0,
        ngo:0

}

const donationReducers= (state = {...initialState}, action) => {
  switch (action.type) {
    case 'GET_DONATIONS':
      return {
        ...state,
        donations:action.donations,
        all:action.donations
      }

      case 'FILTER_DONATIONS':
      return {
        ...state,
        donations:action.donations
      }
     case 'NEW_DONATIONS':
      return {
        ...state,
        donations:[action.donations,...state.donations],
        all:[action.donations,...state.donations]
      }
   case 'DONATION_MODAL':
   return {
    ...state,
    donationModal:!state.donationModal
   }
   case 'REMOVE_DONATIONS':
   return {
    ...state,
    donations:state.donations.filter((item)=>item._id!=action.id),
    all:state.donations.filter((item)=>item._id!=action.id)
   }
   case 'UPDATE_DONATIONS':
   return {
    ...state,
    donations:state.donations.map((item)=>{
      
      if(item._id===action.donations._id) 
        return action.donations
      return item
    }),
    all:state.donations.map((item)=>{
      
      if(item._id===action.donations._id) 
        return action.donations
      return item
    })
   }
   case 'GET_ORDER':
   return {
    ...state,
    order:action.data
   }
   case 'DATA':
   console.log(action.data)
   return {
    ...state,
    label1:["Total","Donated"],
    data1:[action.data.total,action.data.sold],
    label2:action.data.label1,
    label3:action.data.label2,
    data2:action.data.data1,
    data3:action.data.data2,
    label4:["No of Donors", "No of NGOs"],
    data4:[action.data.donor,action.data.ngo]
   }
    default:
      return state;
  }
};


export default donationReducers;