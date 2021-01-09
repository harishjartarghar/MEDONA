import MY_DONATIONS from '../views/donations.js';
import Donor_Account from '../views/account.js';
import MailIcon from '@material-ui/icons/Mail';

var routes = [
  {
    path: "",
    name: "My Donations",
    icon: <MailIcon/>,
    component: MY_DONATIONS,
    layout: "/dashboard",
    type:'donor',
  },

  {
    path: "/account",
    name: "My Account",
    icon: <MailIcon/>,
    component: Donor_Account,
    layout: "/dashboard",
    type:'donor',
  }

];
export default routes;
