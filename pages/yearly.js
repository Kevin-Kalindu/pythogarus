import Header from "../components/Header"
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {app, db} from '../firbase'
import { useEffect, useState } from "react"
import {useRouter} from 'next/router'
import Loading from "../components/Loading"
import Sidebar from "../components/Sidebar"
import Accounts from '../components/Accounts'
import { collection, onSnapshot, query, where } from "firebase/firestore"
import StatusCard from '../components/StatusCard'
import { HiOutlineCalendar, HiOutlineClock, HiOutlineUser } from "react-icons/hi"
import { modalState } from "../atoms/modalAtoms"
import { useRecoilState } from "recoil"

function yearly(){
  const storedYear = typeof window !== 'undefined' ? sessionStorage.getItem("year") : null;
  const currentYear = new Date().getFullYear(); // Get the current year
  const open = storedYear !== null ? storedYear : currentYear.toString();
    const [total,setTotal] = useState()
    const[type, setType] = useState()
    const[january, setJanuary] = useState([])
    const[february, setFebruary] = useState([])
    const[march, setMarch] = useState([])
    const[april, setApril] = useState([])
    const[may,setMay] = useState([])
    const[june, setJune] = useState([])
    const[july, setJuly] = useState([])
    const[augest, setAugest] = useState([]) 
    const[september, setSeptember] = useState([]) 
    const[october, setOctober] = useState([]) 
    const[november, setNovember] = useState([]) 
    const[december, setDecember] = useState([])
    const[januaryTotal, setJanuaryTotal] = useState(0)
    const[februaryTotal, setFebruaryTotal] = useState(0)
    const[marchTotal, setMarchTotal] = useState(0)
    const[aprilTotal, setAprilTotal] = useState(0)
    const[mayTotal,setMayTotal] = useState(0)
    const[juneTotal, setJuneTotal] = useState(0)
    const[julyTotal, setJulyTotal] = useState(0)
    const[augestTotal, setAugestTotal] = useState(0) 
    const[septemberTotal, setSeptemberTotal] = useState(0) 
    const[octoberTotal, setOctoberTotal] = useState(0) 
    const[novemberTotal, setNovemberTotal] = useState(0) 
    const[decemberTotal, setDecemberTotal] = useState(0)
    const[logged, setLogged] = useState(false)
    const date = new Date()
    const dd = date.getDate()
    const mm = date.getMonth()
    const yyyy = date.getFullYear()
    const auth = getAuth(app)
    const router = useRouter()
    const collectionRef = collection(db, open)
    const types =['Food',
    'Transport', 'Education',
    'Fuel','General', 'Stationary',
    'Vehical','Computer','Dress',
    'Medical','Telephone','Water',
    'Gas','Electricity','HouseHold',
    'Bank','Baby','Trip',
    'HouseCons','PHD','OmanRent',
    'AirPassage','OmanExpen',
    'NewZealand','Gifts','FD']

    useEffect(() => {
        onAuthStateChanged(auth, (data) =>{
          if(data){
               return
          }else{
            router.push('./login')
          }
        })
      },[auth])

    useEffect( () => {
      const day1 = dd
      const month1 =mm+1
      const january = query(collectionRef, where('month', '==', 1))
      const february = query(collectionRef, where('month', '==', 2))
      const march = query(collectionRef, where('month', '==', 3))
      const april = query(collectionRef, where('month', '==', 4))
      const may = query(collectionRef, where('month', '==', 5))
      const june = query(collectionRef, where('month', '==', 6))
      const july = query(collectionRef, where('month', '==', 7))
      const augest = query(collectionRef, where('month', '==', 8))
      const september = query(collectionRef, where('month', '==', 9))
      const october = query(collectionRef, where('month', '==', 10))
      const november = query(collectionRef, where('month', '==', 11))
      const december = query(collectionRef, where('month', '==', 12))
      onSnapshot(january, (data) => {
        setJanuary(data.docs.map((item) => {
          return {...item.data(), id: item.id}
        }))})
        onSnapshot(february, (data) => {
          setFebruary(data.docs.map((item) => {
            return {...item.data(), id: item.id}
          }))})
          onSnapshot(march, (data) => {
            setMarch(data.docs.map((item) => {
              return {...item.data(), id: item.id}
            }))})
            onSnapshot(april, (data) => {
              setApril(data.docs.map((item) => {
                return {...item.data(), id: item.id}
              }))})
              onSnapshot(may, (data) => {
                setMay(data.docs.map((item) => {
                  return {...item.data(), id: item.id}
                }))})
                onSnapshot(june, (data) => {
                  setJune(data.docs.map((item) => {
                    return {...item.data(), id: item.id}
                  }))})
                onSnapshot(july, (data) => {
                  setJuly(data.docs.map((item) => {
                    return {...item.data(), id: item.id}
                  }))})
                onSnapshot(augest, (data) => {
                    setAugest(data.docs.map((item) => {
                     return {...item.data(), id: item.id}
                    }))})
                onSnapshot(september, (data) => {
                    setSeptember(data.docs.map((item) => {
                    return {...item.data(), id: item.id}
                }))})
                onSnapshot(october, (data) => {
                    setOctober(data.docs.map((item) => {
                    return {...item.data(), id: item.id}
                }))})
                onSnapshot(november, (data) => {
                    setNovember(data.docs.map((item) => {
                   return {...item.data(), id: item.id}
                }))})
                onSnapshot(december, (data) => {
                    setDecember(data.docs.map((item) => {
                    return {...item.data(), id: item.id}
                }))})
                setTimeout(() => {
                  setLogged(true)
                }, 2000);
      },[])
    
    function getData(){
      let all = 0
      let total = 0
      january.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setJanuaryTotal(total)
      total = 0
      february.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setFebruaryTotal(total)
      total = 0
      march.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setMarchTotal(total)
      total = 0
      april.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setAprilTotal(total)
      total = 0
      may.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setMayTotal(total)
      total = 0
      june.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setJuneTotal(total)
      total = 0
      july.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setJulyTotal(total)
      total = 0
      augest.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setAugestTotal(total)
      total = 0
      september.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setSeptemberTotal(total)
      total = 0
      october.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setOctoberTotal(total)
      total = 0
      november.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setNovemberTotal(total)
      total = 0
      december.map((item)=> {
        if(item.type == type){
          total += item.amount
          all += item.amount
        }else{
          return
        }
      })
      setDecemberTotal(total)
      total = 0
      setTotal(all)
      all = 0
    }

    const Button = ({name}) => {
      return(
        <div onClick={() => {
          if(name == type){
            setType('')
          }else{
            setType(name)
          }
        }} className={`text-white flex justify-center ml-2 mb-3 ${type === name ? 'border-green-500' : 'border-white'} border-2`}>
        <button >{name}</button>
      </div>
        )
    }

    return(
        <div>
           <header className=''>
                <title>Pythogarus</title>
                <script src="../components/script.js"></script>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2318083812487394"
     crossorigin="anonymous"></script>
          </header>
      {logged ? (
        <div className="flex w-full min-h-screen font-sans bg-gray-800">
        <Sidebar page={'yearly'}/>
        <main className="flex flex-col flex-1 gap-6 p-4">
              <header>
                <h1 className="text-3xl font-semibold leading-loose text-white">Yearly Report</h1>
              </header>
              <div className="flex gap-6">
            <div className='flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3'>
                <div className='flex items-center justify-between'>
                    <div className='p-2 bg-gray-800 rounded-lg'>
                        <HiOutlineUser className='text-white' />
                    </div>
                    <span className='text-accent-green text:xs pr-4 font-medium'>type</span>
                </div>
                <div className='text-3xl font-semibold text-white'>{type}</div>
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
              <table className="w-full">
                <thead>
                    <tr className="text-sm font-semibold text-white">
                      <td className="py-4 border-b border-gray-700">Month</td>
                      <td className="py-4 border-b border-gray-700">Amount</td>
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-500">
                  <tr><td className="py-4">January</td><td>{januaryTotal}</td></tr>
                  <tr><td className="py-4">February</td><td>{februaryTotal}</td></tr>
                  <tr><td className="py-4">March</td><td>{marchTotal}</td></tr>
                  <tr><td className="py-4">April</td><td>{aprilTotal}</td></tr>
                  <tr><td className="py-4">May</td><td>{mayTotal}</td></tr>
                  <tr><td className="py-4">June</td><td>{juneTotal}</td></tr>
                  <tr><td className="py-4">July</td><td>{julyTotal}</td></tr>
                  <tr><td className="py-4">Augest</td><td>{augestTotal}</td></tr>
                  <tr><td className="py-4"> September</td><td>{septemberTotal}</td></tr>
                  <tr><td className="py-4">October</td><td>{octoberTotal}</td></tr>
                  <tr><td className="py-4">November</td><td>{novemberTotal}</td></tr>
                  <tr><td className="py-4">December</td><td>{decemberTotal}</td></tr>
                </tbody>
              </table>
        </main>
        <aside className="flex flex-col  pt-2 pr-6 w-96">
          <div className="space-y-2 flex flex-col p-2 px-6 bg-gray-900 rounded-lg">
            <div className=" flex justify-between items-center">
              <h2 className="text-xl font-semibold leading-loose text-white">Genre</h2>
              <button onClick={getData} className="flex-col px-4 rounded-lg border border-gray-700">
                <span className="text-sm text-white">Show Total</span>
              </button>
            </div>
            <div className="grid grid-cols-2">
              {types.map((item) => {
                return(
                  <Button name={item}/>
              )})}
            </div>
          </div>
        </aside>
        </div>
      ) : (<Loading/>)}
  </div>
    )
}

export default yearly
