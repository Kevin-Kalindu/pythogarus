import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app, db } from '../firbase'
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Loading from "../components/Loading"
import Sidebar from "../components/Sidebar"
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { HiArrowLeft, HiArrowRight, HiOutlineCalendar, HiOutlineClock, HiOutlineUser } from "react-icons/hi"
import MonthlyAccounts from '../components/MonthlyAccounts'

function monthly() {
  const date = new Date()
  const dd = date.getDate()
  const mm = date.getMonth() + 1
  const yyyy = date.getFullYear()
  const [posts, setPosts] = useState([])
  const router = useRouter()
  const [logged, setLogged] = useState(false)
  const auth = getAuth(app)
  const[month,setMonth] = useState(mm)
  let Total = 0
  let Education = 0
  let Fuel = 0
  let Food = 0
  let Transport = 0
  let General = 0
  let Stationary = 0
  let Vehical = 0
  let Computer = 0
  let Dress = 0
  let Medical = 0
  let Telephone = 0
  let Water = 0
  let Gas = 0
  let Electricity = 0
  let HouseHold = 0
  let Bank = 0
  let Baby = 0
  let School = 0
  let HouseCons = 0
  let PHD = 0
  let OmanRent = 0
  let AirPassage = 0
  let OmanExpen = 0
  let NewZealand = 0
  let Gifts = 0
  let TotalGifts = 0
  let TotalEducation = 0
  let TotalFuel = 0
  let TotalFood = 0
  let TotalTransport = 0
  let TotalGeneral = 0
  let TotalStationary = 0
  let TotalVehical = 0
  let TotalComputer = 0
  let TotalDress = 0
  let TotalMedical = 0
  let TotalTelephone = 0
  let TotalWater = 0
  let TotalGas = 0
  let TotalElectricity = 0
  let TotalHouseHold = 0
  let TotalBank = 0
  let TotalBaby = 0
  let TotalSchool = 0
  let TotalHouseCons = 0
  let TotalPHD = 0
  let TotalOmanRent = 0
  let TotalAirPassage = 0
  let TotalOmanExpen = 0
  let TotalNewZealand = 0

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setLogged(true)
      } else {
        router.push('./login')
      }
    })
  }, [auth])

  useEffect(() => {
    const collectionRef = collection(db, sessionStorage.getItem('year'))
    const monthRef = query(collectionRef,where('month', '==', mm))
    onSnapshot(monthRef, (data) => {
      setPosts(data.docs.map((item) => {
        return { ...item.data(), id: item.id }
      }))
    })
  }, [db])

  const change =(mm1) => {
    const collectionRef = collection(db, sessionStorage.getItem('year'))
    const monthRef = query(collectionRef,where('month', '==', mm1))
    onSnapshot(monthRef, (data) => {
      setPosts(data.docs.map((item) => {
        return { ...item.data(), id: item.id }
      }))})
  }

  function Display(name, amount){
    if(name== 'Education'){
      Education +=amount
      TotalEducation +=1
      Total += amount
    }
    if(name== 'Fuel'){
      Fuel += amount
      TotalFuel += 1
      Total += amount
    }
    if(name== 'Food'){
      Food += amount
      TotalFood += 1
      Total += amount
    }
    if(name== 'Transport'){
      Transport += amount
      TotalTransport +=1
      Total += amount
    }
    if(name== 'General'){
      General += amount
      TotalGeneral +=1
      Total += amount
    }
    if(name== 'Stationary'){
      Stationary += amount
      TotalStationary += 1
      Total += amount
    }
    if(name== 'Vehical'){
      Vehical += amount
      TotalVehical += 1
      Total += amount
    }
    if(name== 'Computer'){
      Computer += amount
      TotalComputer += 1
      Total += amount
    }
    if(name== 'Dress'){
      Dress += amount
      TotalDress += 1
      Total += amount
    }
    if(name== 'Medical'){
      Medical += amount
      TotalMedical += 1
      Total += amount
    }
    if(name== 'Telephone'){
      Telephone += amount
      TotalTelephone += 1
      Total += amount
    }
    if(name== 'Water'){
      Water += amount
      TotalWater += 1
      Total += amount
    }
    if(name== 'Gas'){
      Gas += amount
      TotalGas +=1
      Total += amount
    }
    if(name== 'Electricity'){
      Electricity += amount
      TotalElectricity += 1
      Total += amount
    }
    if(name== 'HouseHold'){
      HouseHold += amount
      TotalHouseHold+=1
      Total += amount
    }
    if(name== 'Bank'){
      Bank += amount
      TotalBank +=1
      Total += amount
    }
    if(name== 'Baby'){
      Baby += amount
      TotalBaby +=1 
      Total += amount
    }
    if(name== 'School'){
      School += amount
      TotalSchool +=1
      Total += amount
    }
    if(name== 'HouseCons'){
      HouseCons += amount
      TotalHouseCons +=1
      Total += amount
    }
    if(name== 'PHD'){
      PHD += amount
      TotalPHD += 1
      Total += amount
    }
    if(name== 'OmanRent'){
      OmanRent += amount
      TotalOmanRent+=1
      Total += amount
    }
    if(name== 'AirPassage'){
      AirPassage += amount
      TotalAirPassage+=1
      Total += amount
    }
    if(name== 'OmanExpen'){
      OmanExpen += amount
      TotalOmanExpen+=1
      Total += amount
    }
    if(name== 'NewZealand'){
      NewZealand += amount
      TotalNewZealand+=1
      Total += amount
    }
    if(name== 'Gifts'){
      Gifts += amount
      TotalGifts+=1  
      Total += amount  
    }
  }

  return (
    <div>
       <header className=''>
                <title>Pythogarus</title>
                <script src="../components/script.js"></script>
          </header>
      {logged ? (
        <div className="bg-gray-800 flex w-full min-h-screen font-sans">
          <Sidebar page={'monthly'} />
          <main className="flex flex-col flex-1 gap-6 p-4">
          <header>
                <h1 className="text-3xl font-semibold leading-loose text-white">Monthly Report</h1>
            </header>
            {posts.map((item) => {
                      Display(item.type, item.amount)
            })}
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
                <div className='text-3xl font-semibold text-white'>{Total}</div>
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
            <div className="p-6 bg-gray-900 rounded-lg">
              <div className="flex justify-between">
                <div className="text-white text-xl">{month}</div>
                <div className="items-center text-white flex gap-x-2">
                  <div onClick={() => {
                    if(month -1 <= 0){
                      setMonth(12)
                      change(12)
                    }else{
                      setMonth(month-1)
                      change(month-1)
                    }
                  }} className="border p-2 cursor-pointer">
                    <HiArrowLeft/>
                  </div>
                  <div onClick={() => {
                    if(month + 1 >= 13){
                      setMonth(1)
                      change(1)
                    }else{
                      setMonth(month+1)
                      change(month+1)
                    }
                  }} className="border cursor-pointer p-2">
                    <HiArrowRight/>
                  </div>
                </div>
              </div>
              <div className="mx-4 mt-4">
                <div className="mb-2 text-center text-xl text-white grid grid-cols-3">
                  <h3>Type</h3>
                  <h3>Amount</h3>
                  <h3>Number</h3>
                </div>
                <div className='text-center flex flex-col space-y-4'>
                  <MonthlyAccounts color1={'accent-green'} name={'Food'} amount={Food} number={TotalFood}/>
                  <MonthlyAccounts color1={'accent-blue'} name={'Fuel'} amount={Fuel} number={TotalFuel}/>
                  <MonthlyAccounts color1={'accent-red'} name={'Transportation'} amount={Transport} number={TotalTransport}/>
                  <MonthlyAccounts color1={'accent-orange'} name={'Education'} amount={Education} number={TotalEducation}/>
                  <MonthlyAccounts color1={'accent-purple'} name={'Genral'} amount={General} number={TotalGeneral}/>
                  <MonthlyAccounts color1={'yellow-300'} name={'Stationary'} amount={Stationary} number={TotalStationary}/>
                  <MonthlyAccounts color1={'accent-green'} name={'Vehical'} amount={Vehical} number={TotalVehical}/>
                  <MonthlyAccounts color1={'accent-blue'} name={'Computer'} amount={Computer} number={TotalComputer}/>
                  <MonthlyAccounts color1={'accent-red'} name={'Dress'} amount={Dress} number={TotalDress}/>
                  <MonthlyAccounts color1={'accent-orange'} name={'Medical'} amount={Medical} number={TotalMedical}/>
                  <MonthlyAccounts color1={'accent-purple'} name={'Telephone'} amount={Telephone} number={TotalTelephone}/>
                  <MonthlyAccounts color1={'yellow-300'} name={'Water'} amount={Water} number={TotalWater}/>
                  <MonthlyAccounts color1={'accent-green'} name={'Gas'} amount={Gas} number={TotalGas}/>
                  <MonthlyAccounts color1={'accent-blue'} name={'Electricity'} amount={Electricity} number={TotalElectricity}/>
                  <MonthlyAccounts color1={'accent-red'} name={'HouseHold'} amount={HouseHold} number={TotalHouseHold}/>
                  <MonthlyAccounts color1={'accent-orange'} name={'Bank'} amount={Bank} number={TotalBank}/>
                  <MonthlyAccounts color1={'accent-purple'} name={'Baby'} amount={Baby} number={TotalBaby}/>
                  <MonthlyAccounts color1={'yellow-300'} name={'School'} amount={School} number={TotalSchool}/>
                  <MonthlyAccounts color1={'accent-green'} name={'HouseCons'} amount={HouseCons} number={TotalHouseCons}/>
                  <MonthlyAccounts color1={'accent-blue'} name={'PHD'} amount={PHD} number={TotalPHD}/>
                  <MonthlyAccounts color1={'accent-red'} name={'OmanRent'} amount={OmanRent} number={TotalOmanRent}/>
                  <MonthlyAccounts color1={'accent-orange'} name={'AirPassage'} amount={AirPassage} number={TotalAirPassage}/>
                  <MonthlyAccounts color1={'accent-purple'} name={'OmanExpen'} amount={OmanExpen} number={TotalOmanExpen}/>
                  <MonthlyAccounts color1={'yellow-300'} name={'NewZealand'} amount={NewZealand} number={TotalNewZealand}/>
                  <MonthlyAccounts color1={'accent-green'} name={'Gifts'} amount={Gifts} number={TotalGifts}/>
                </div>
              </div>
              <h1></h1>
            </div>
          </main>

        </div>
      ) : (<Loading />)}
    </div>
  )

}

export default monthly

