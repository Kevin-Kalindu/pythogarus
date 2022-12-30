import {HiOutlineClock, HiOutlineCalendar, HiOutlineUser} from 'react-icons/hi'
import {getAuth} from 'firebase/auth'
import {app} from '../firbase'

function StatusCard({amount, current}){
    if(amount){
        sessionStorage.setItem('total', amount)
    }
    const auth = getAuth(app)
    const total = sessionStorage.getItem('total')
    const date = new Date()
    const dd = date.getDate()
    const mm = date.getMonth()+1
    const yyyy = date.getFullYear()
    return(
        <div className="flex gap-6">
            <div className='flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3'>
                <div className='flex items-center justify-between'>
                    <div className='p-2 bg-gray-800 rounded-lg'>
                        <HiOutlineUser className='text-white' />
                    </div>
                    <span className='text-accent-green text:xs pr-4 font-medium'>Authorized</span>
                </div>
                <div className='text-3xl font-semibold text-white'>{auth.currentUser.email}</div>
            </div>
            <div className='flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3'>
                <div className='flex items-center justify-between'>
                    <div className='p-2 bg-gray-800 rounded-lg'>
                        <HiOutlineCalendar className='text-white' />
                    </div>
                    <span className='text-accent-blue text:xs pr-4 font-medium'>Total spent</span>
                </div>
                <div className='text-3xl font-semibold text-white'>{total}</div>
            </div>
            <div className='flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3'>
                <div className='flex items-center justify-between'>
                    <div className='p-2 bg-gray-800 rounded-lg'>
                        <HiOutlineClock className='text-white' />
                    </div>
                    <span className='text-accent-red text:xs pr-4 font-medium'>Today is</span>
                </div>
                <div className='text-3xl font-semibold text-white'>{`${dd}/${mm}/${yyyy}`}</div>
            </div>
        </div>
    )
}

export default StatusCard

//{`${dd}/${mm}/${yyyy}`}