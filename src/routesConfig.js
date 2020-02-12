import Home from './pages/home/Home';
import Vistoria from './pages/vistoria/Vistoria';
import Automovel from './pages/automovel/Automovel';
import Residencial from './pages/residencial/Residencial';
import SignUp from './pages/signup/SignUp';
import Segurado from './pages/segurado/Segurado';
import Vistorias from "./pages/vistorias/Vistorias"
import Checklist from "./pages/checklist/Checklist"

const routesConfig = [
    {
        path:"/",
        component: Home,
        exact:true,
    },
    {
        path:"/vistoria",
        component: Vistoria,
        exact:true,
        role: 'INSURED'
    },
    {
        path:"/vistorias",
        component: Vistorias,
        exact:true,
        role: 'ADMIN'
    },
    {
        path:"/checklist/",
        component: Checklist,
        exact:true,
        role: 'ADMIN'
    },
    {
        path:"/automovel",
        component: Automovel,
        exact:true,
        role: 'INSURED'
    },
    {
        path:"/residencial",
        component: Residencial,
        exact:true,
        role: 'INSURED'
    },
    {
        path: '/signup',
        component: SignUp,
        exact: true,
        role: 'ADMIN'
    },
    {
        path: '/segurado',
        component: Segurado,
        exact: true,
        role: 'ADMIN'
    },
]

export default routesConfig