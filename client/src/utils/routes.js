import MY_DONATIONS from '../views/donations.js';
import Store from '../views/store.js';
import Cart from '../views/cart.js';
import Order from '../views/order.js';
import Donor_Account from '../views/account.js';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AppsIcon from '@material-ui/icons/Apps';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
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
  },
  {
    path: "/store",
    name: "Medicine Store",
    icon: <StoreIcon fontSize="large"/>,
    component: Store,
    layout: "/dashboard",
    type:'ngo',
  },
 
   {
    path: "/cart",
    name: "My Cart",
    icon: <ShoppingCartIcon fontSize="large"/>,
    component: Cart,
    layout: "/dashboard",
    type:'ngo',
  },
   {
    path: "/Orders",
    name: "My Orders",
    icon: <PlayArrowIcon fontSize="large"/>,
    component: Order,
    layout: "/dashboard",
    type:'ngo',
  },
   {
    path: "/account",
    name: "My Account",
    icon: <AccountTreeIcon fontSize="large"/>,
    component: Donor_Account,
    layout: "/dashboard",
    type:'ngo',
  }

];
export default routes;
