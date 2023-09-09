import { useRouter } from 'next/router'
import {HiLogout ,HiCalculator,HiBookOpen,HiCalendar, HiPlusCircle, HiHome, HiCurrencyDollar,HiSave} from 'react-icons/hi'
import {getAuth, signOut} from 'firebase/auth'
import {app} from '../firbase'

function Sidebar({page}){
    const router = useRouter()
    const auth = getAuth(app)
    const menus = [
        {name: 'main', Icon:HiHome},
        {name: 'add', Icon:HiPlusCircle},
        {name: 'daily', Icon:HiCalculator},
        {name:'monthly', Icon:HiCalendar},
        {name: 'yearly', Icon:HiCurrencyDollar},
        {name: 'notes', Icon:HiBookOpen},
        {name: 'logOut', Icon: HiLogout},
        {name: 'download', Icon: HiSave}
    ]

    function logOut(){
        signOut(auth)
    }
    return(
            <div className='sticky top-0 left-0 flex flex-col h-screen items-center py-8 w-24 bg-gray-900'>
                <div className='flex flex-col gap-y-8'>
                {menus.map(({name, Icon}) => {
                    return(
                        <div>
                            <button onClick={() => {
                                if(name === 'logOut'){
                                    logOut()
                                }else{
                                    router.push(`./${name}`)
                                }
                            }} className={`p-2 text-3xl rounded-xl hover:text-orange-400 hover:bg-primary hover:bg-opacity-20 text-orange-400 ${page === name ? 'text-orange-400 bg-opacity-20 bg-primary': ' fill-current'} `}><Icon/></button>
                        </div>
                    )})}
            </div>
            </div>
    )
}

export default Sidebar
