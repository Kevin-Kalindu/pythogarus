import { collection, limit, onSnapshot, orderBy, query} from "firebase/firestore"
import { useEffect, useState } from "react"
import { app, db } from "../firbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useRouter} from 'next/router'
import Sidebar from '../components/Sidebar'
import StatusCard from '../components/StatusCard'
import Loading from '../components/Loading'
import Accounts from "../components/Accounts";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtoms";

function Home(){
    const date = new Date()
    const[open,setOpen] = useRecoilState(modalState)
    const[posts, setPosts] = useState([])
    const[loading, setLoading] = useState(true)
    const router = useRouter()
    const[logged, setLogged] = useState(false)
    const auth = getAuth(app)
    useEffect(() => {
        onAuthStateChanged(auth, (data) =>{
          if(data){
               setLogged(true)
               setLoading(false)
          }else{
            router.push('./login')
          }
        })
      },[auth])
    
    useEffect(() => {
      const collectionRef = collection(db, open)
      const timestamp = query(collectionRef, orderBy('date', 'desc'), limit(20))
        onSnapshot(timestamp, (data) => {
          setPosts(data.docs.map((item) => {
            return {...item.data(), id: item.id}
          }))
         })
      },[db])


    return(
        <div>
           <header className=''>
                <title>Pythogarus</title>
                <script src="../components/script.js"></script>
          </header>
            {logged ? (
                <div>
                    {loading ? (
                        <div><Loading/></div>
                    ) : (
                    <div className="flex w-full min-h-screen font-sans bg-gray-800">
                        <Sidebar page={'main'}/>
                        <main className=" flex flex-col flex-1 gap-6 p-4">
                          <header>
                            <h1 className="text-3xl font-semibold leading-loose text-white">Console</h1>
                            <div className="text-gray-200">Made by Kevin</div>
                          </header>
                          <hr className="border-gray-700"/>
                          <StatusCard/>
                          <div className="p-6 bg-gray-900 rounded-lg">
                            <table className="w-full">
                              <thead>
                                  <tr className="text-sm font-semibold text-white">
                                      <td className="py-4 border-b border-gray-700">Expense</td>
                                      <td className="py-4 border-b border-gray-700">Amount</td>
                                      <td className="py-4 border-b border-gray-700">Date</td>
                                      <td className="py-4 border-b border-gray-700">Type</td>
                                  </tr>
                              </thead>
                              <tbody>
                                {posts.map((item) => {
                                  return(
                                    <Accounts id={item.id} month={item.month} expense={item.expense} amount={item.amount} type={item.type} date={item.date}/>
                                  )
                                })}
                              </tbody>
                          </table>
                          </div>
                        </main>
                    </div>)}
                </div>
            ): (<div><Loading/></div>)}
        </div>
    )
}

export default Home

