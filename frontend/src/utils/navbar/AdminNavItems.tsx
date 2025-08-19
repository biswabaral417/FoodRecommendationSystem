import { Home,  ShoppingCart } from "lucide-react";



const AdminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <Home />,
        isProtedted: false,
    },
    {
        title: 'Products',
        path: '/products',
        icon: <ShoppingCart />,
        isProtedted: false,
    },


]
export default AdminNavItems;