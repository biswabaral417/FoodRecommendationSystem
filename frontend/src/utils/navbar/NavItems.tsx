import { Home, Info, ShoppingCart, TruckElectric } from "lucide-react";



interface NavItemProps {
    title: string;
    path: string;
    icon: React.ReactElement ;
    isProtedted: boolean;
}

const NavItems: NavItemProps[] = [
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