import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {app, db} from '../firbase'
import { useEffect, useState } from "react"
import {useRouter} from 'next/router'
import Loading from '../components/Loading'
import Sidebar from "../components/Sidebar"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import Accounts from "../components/Accounts"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi"
import Head from 'next'
import { modalState } from '../atoms/modalAtoms'
import { useRecoilState } from 'recoil'

function daily(){
    const [open,setOpen] = useRecoilState(modalState)
    const date = new Date()
    const dd = date.getDate()
    const mm = date.getMonth()
    const yyyy = date.getFullYear()
    const collectionRef = collection(db, open)    
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const[logged, setLogged] = useState(false)
    const auth = getAuth(app)
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        onAuthStateChanged(auth, (data) =>{
          if(data){
               setLogged(true)
          }else{
            router.push('./login')
          }
        })
      },[auth])

    useEffect(() =>{
      const day1 = dd
      const month1 =mm+1
      setMonth(mm+1)
      setDay(dd)
      const daily = query(collectionRef, where('month', '==', month1), where('datemonth','==',day1))
      onSnapshot(daily, (data) => {
        setPosts(data.docs.map((item) => {
          return {...item.data(), id: item.id}
        }))
       })
       setLoading(true)
    },[db])

    function change(testday, testmonth){
      const daily1 = query(collectionRef, where('month', '==', testmonth), where('datemonth','==',testday))
      onSnapshot(daily1, (data) => {
        setPosts(data.docs.map((item) => {
          return {...item.data(), id: item.id}
        }))
       })
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
        <div className="bg-gray-800">
          <header className=''>
                <title>Pythogarus</title>
                <script src="../components/script.js"></script>
          </header>
          {loading ? (
            <div className="flex w-full min-h-screen font-sans">
            <Sidebar page={'daily'}/>
            <main className="flex flex-col flex-1 gap-6 p-4">
            <header>
                <h1 className="text-3xl font-semibold leading-loose text-white">Daily Report</h1>
              </header>
            <div className="p-6 bg-gray-900 rounded-lg">
              <div className="flex justify-between">
                <div className="flex gap-x-4 text-white">
                  <div>{day}</div>
                  <div>{month}</div>
                </div>
                <div className="items-center text-white flex gap-x-2">
                  <div onClick={() => {
                    if(day -1 <= 0){
                      setDay(31)
                      if(month -1 <= 0){
                        setMonth(12)
                        change(31,12)
                      }else{
                        setMonth(month-1)
                        change(31,month-1)
                      }
                    }else{
                      setDay(day-1)
                      change(day-1,month)
                    }
                  }} className="border p-2 cursor-pointer">
                    <HiArrowLeft/>
                  </div>
                  <div onClick={() => {
                    if(day + 1 >= 32){
                      setDay(1)
                      if(month +1 >= 13){
                        setMonth(1)
                        change(1,1)
                      }else{
                        setMonth(month+1)
                        change(1,month+1)
                      }
                    }else{
                      setDay(day+1)
                      change(day+1, month)
                    }
                  }} className="border cursor-pointer p-2">
                    <HiArrowRight/>
                  </div>
                </div>
              </div>
            <table className="w-full">
              <thead>
                  <tr className="text-sm font-semibold text-white">
                    <td className="py-4 border-b border-gray-700">Expense</td>
                    <td className="py-4 border-b border-gray-700">Amount</td>
                    <td className="py-4 border-b border-gray-700">Date</td>
                    <td className="py-4 border-b border-gray-700">Type</td>
                    <td className="py-4 border-b border-gray-700"></td>
                  </tr>
              </thead>
              <tbody>
                  {posts.map((item) => {
                    return(
                        <Accounts month={item.month} id={item.id} expense={item.expense} amount={item.amount} type={item.type} date={item.date}/>
                  )})}
              </tbody>
              </table>
              </div>
            </main>
    
            </div>
          ) : (<Loading/>)}
        </div>
      ) : (<Loading/>)}
  </div>
    )
}

export default daily
