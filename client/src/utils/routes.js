import MY_DONATIONS from '../views/donations.js';
import Donor_Account from '../views/account.js';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AppsIcon from '@material-ui/icons/Apps';
var routes = [
  {
    path: "",
    name: "My Donations",
    icon: <AppsIcon fontSize="large"/>,
    component: MY_DONATIONS,
    layout: "/dashboard",
    type:'donor',
  },

  {
    path: "/account",
    name: "My Account",
    icon: <AccountTreeIcon fontSize="large"/>,
    component: Donor_Account,
    layout: "/dashboard",
    type:'donor',
  }

];
export default routes;
