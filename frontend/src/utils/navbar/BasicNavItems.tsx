import { Home, Info, ShoppingCart, TruckElectric } from "lucide-react";




const NavItems: NavItem[] = [
    {
        title: 'Home',
        path: '/',
        icon: <Home />,
        isProtedted: false,
    },
    {
        title: 'My Cart',
        path: '/my_cart',
        icon: <ShoppingCart />,
        isProtedted: false,
    },
    {
        title: 'My Orders',
        path: '/my_orders',
        icon: <TruckElectric />,
        isProtedted: false,
    },
    {
        title: 'about',
        path: '/about',
        icon: <Info />,
        isProtedted: false,
    },

]
export default NavItems;