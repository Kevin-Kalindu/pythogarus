import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {useRouter} from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { app, db } from '../firbase'
import Sidebar from '../components/Sidebar'


export default function Home() {
  const open = typeof window !== 'undefined' ? sessionStorage.getItem("year") : null;
  const router = useRouter()
  const auth = getAuth(app)
  const [type, setType] = useState()
  const [expense, setExpense] = useState()
  const [amount, setAmount] = useState()
  const[Alert1, setAlert1] = useState(false)
  const[logged, setLogged] = useState(false)
  const[date1, setDate] = useState()
  const target = useRef(null)
  const [amountfinal, setAmountfinal] = useState()
  const [testResult, setTestResult] = useState("");
  
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
    const storedDate1 = localStorage.getItem('savedDate1');
    if (storedDate1) {
      setDate(storedDate1);
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (data) =>{
      if(data){
           setLogged(true)
      }else{
        router.push('./login')
      }
    })
  },[auth])

  const reset = () => {
    console.log('success')
      setAlert1(false)
      setAmount('')
      setAmountfinal('')
      setExpense('')
      setType('')
      localStorage.setItem('savedDate1', date1);
  }

  const addData = () => {
    try {
      const dater = date1.charAt(8)
    const dater2 = date1.charAt(9)     
    const monthr = date1.charAt(5)
    const monthr2 = date1.charAt(6)
    const date3 = Number(dater.concat(dater2))
    const month = Number(monthr.concat(monthr2))
    const amountfinal = eval(amount)
    addDoc(collection(db,open), {
      expense: expense,
      amount: Number(amountfinal),
      date: date1,
      type: type,
      timeStamp: serverTimestamp(),
      month: month,
      datemonth: date3
    }).then(() => {
      reset()
    })
    }catch{
      reset()
      alert('invalid amount')
    }
  
  }

  const Button = ({name}) => {
      return(
        <div className={`
        flex justify-center ml-2 mb-3 
        text-sm sm:text-base md:text-lg lg:text-xl font-medium 
        ${type === name ? 'border-green-500' : 'border-black'} 
        border-2 sm:border-2 md:border-4 lg:border-4
      `}>
          <button onClick={() => {
            if(name == type){
              setType('')
            }else{
              setType(name)
            }
          }}>{name}</button>
        </div>
      )
  }
  
  return (
    <div ref={target} className="min-h-screen overflow-x-hidden">
  
      {/* --- FIXED SIDEBAR --- */}
      <div className="fixed top-0 left-0 h-full z-50 w-[230px] lg:w-[60px] bg-white shadow-lg">
        <Sidebar page={'add'} className="h-full" />
      </div>
  
      {/* --- MAIN CONTENT, ALWAYS OFFSET FROM SIDEBAR --- */}
      <div className="flex flex-col lg:flex-row min-h-screen 
                      pl-[240px] lg:pl-[280px]   /* ← Creates safe space from sidebar */
                      pr-4 py-4 gap-6 bg-gray-800">
  
        {/* --- FORM SECTION --- */}
        <main className="bg-white rounded-xl shadow p-6 flex-grow 
                         max-w-3xl w-full 
                         overflow-y-auto order-1">
          <div className="space-y-5">
  
            {/* Date */}
            <div>
              <label className="block space-y-2">
                <span className="text-lg text-gray-800">Date</span>
                <input
                  type="date"
                  value={date1}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-yellow-100 lg:bg-white border lg:border-2 
                             border-gray-400 lg:border-gray-200 
                             w-full p-3 rounded focus:outline-none 
                             focus:border-gray-400"
                />
              </label>
            </div>
  
            {/* Expense */}
            <div>
              <label className="block space-y-2">
                <span className="text-lg text-gray-800">Expense</span>
                <input
                  type="text"
                  value={expense}
                  onChange={(e) => setExpense(e.target.value)}
                  className="bg-yellow-100 lg:bg-white border lg:border-2 
                             border-gray-400 lg:border-gray-200 
                             w-full p-3 rounded focus:outline-none 
                             focus:border-gray-400"
                />
              </label>
            </div>
  
            {/* Amount */}
            <div>
              <label className="block space-y-2">
                <span className="text-lg text-gray-800">Amount</span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-yellow-100 lg:bg-white border lg:border-2 
                             border-gray-400 lg:border-gray-200 
                             w-full p-3 rounded focus:outline-none 
                             focus:border-gray-400"
                />
              </label>
            </div>
  
            {/* Submit */}
            <div>
              {Alert1 ? (
                <button className="animate-pulse bg-green-400 w-full p-3 rounded">
                  Please wait
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (amount !== '' && type !== '' && expense !== '') {
                      setAlert1(true);
                      addData();
                    }
                  }}
                  className="bg-yellow-200 border-2 border-yellow-300 
                             w-full p-3 rounded hover:bg-yellow-300 transition"
                >
                  Submit
                </button>
              )}
            </div>
  
          </div>
        </main>
  
        {/* --- TYPES SECTION (BETTER WIDTH + RIGHT SIDE) --- */}
        <section
          className="bg-green-100 rounded-xl shadow p-6 
                     w-full lg:w-[320px] xl:w-[380px] /* ← more width */
                     overflow-y-auto order-2">
          <div className="grid grid-cols-2 gap-4">
            {types.map((item) => (
              <Button key={item} name={item} />
            ))}
          </div>
        </section>
  
      </div>
    </div>
  );


}
