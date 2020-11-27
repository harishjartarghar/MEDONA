import React from "react"



class Dashboard extends React.Component {
	render(){
		if(localStorage.getItem("jwt")==null || localStorage.getItem("jwt")==undefined)
      			 this.props.history.push("/login");

		return (
   			<div></div>
  );
	}
  
}

export default Dashboard;
