import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { app, db } from '../firebase'
import Sidebar from '../components/Sidebar'
import Image from 'next/image'

export default function Home() {
  const open = typeof window !== 'undefined' ? sessionStorage.getItem("year") : null;
  const router = useRouter();
  const auth = getAuth(app);
  const [type, setType] = useState('');
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState(false);
  const [logged, setLogged] = useState(false);
  const [date1, setDate] = useState('');

  const types = [
    'Food', 'Transport', 'Education', 'Fuel', 'General', 'Stationary',
    'Vehicle', 'Computer', 'Dress', 'Medical', 'Telephone', 'Water',
    'Gas', 'Electricity', 'Household', 'Bank', 'Baby', 'Trip',
    'HouseCons', 'PHD', 'OmanRent', 'AirPassage', 'OmanExpen',
    'NewZealand', 'Gifts', 'FD'
  ];

  useEffect(() => {
    const storedDate1 = localStorage.getItem('savedDate1');
    if (storedDate1) {
      setDate(storedDate1);
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setLogged(true);
      } else {
        router.push('./login');
      }
    });
  }, [auth]);

  const addData = () => {
    const dater = date1.charAt(8);
    const dater2 = date1.charAt(9);
    const monthr = date1.charAt(5);
    const monthr2 = date1.charAt(6);
    const date3 = Number(dater.concat(dater2));
    const month = Number(monthr.concat(monthr2));

    addDoc(collection(db, open), {
      expense: expense,
      amount: Number(amount),
      date: date1,
      type: type,
      timeStamp: serverTimestamp(),
      month: month,
      datemonth: date3,
    }).then(() => {
      console.log('Success');
      setAlert(false);
      setType('');
      setAmount('');
      localStorage.setItem('savedDate1', date1);
      window.location.reload();
    });
  };

  const Button = ({ name }) => (
    <div className={`flex justify-center ml-2 mb-3 ${type === name ? 'border-green-500' : 'border-black'} border-2`}>
      <button onClick={() => setType(type === name ? '' : name)}>{name}</button>
    </div>
  );

  return (
    <div className='h-screen'>
      <header>
        <title>Expense Tracker</title>
      </header>

      <div className='fixed top-10 left-40'>
        <Image src='/Sun.png' height={120} width={120} alt="Sun" />
      </div>

      <Sidebar page={'add'} />

      <section className='absolute bg-green-100' style={{
        top: '4vh',
        left: '115vw',
        width: '20vw',
        height: '90vh'
      }}>
        <div className='grid grid-cols-2 p-6'>
          {types.map((item) => (
            <Button name={item} key={item} />
          ))}
        </div>
      </section>

      <main className='absolute bg-white' style={{
        top: '4vh',
        left: '140vw',
        width: '50vw',
        height: '90vh'
      }}>
        <div className="form-wrapper flex items-center lg:h-full px-10 relative z-10 pt-16 lg:pt-0">
          <div className="w-full space-y-5">
            <div className="form-element">
              <label className="space-y-2 w-full lg:w-4/5 block mx-auto">
                <span className="block text-lg text-gray-800 tracking-wide">Date</span>
                <input onChange={(e) => setDate(e.target.value)} value={date1} type="date" className="bg-yellow-100 lg:bg-white border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400" />
              </label>
            </div>

            <div className="form-element">
              <label className="space-y-2 w-full lg:w-4/5 block mx-auto">
                <span className="block text-lg text-gray-800 tracking-wide">Expense</span>
                <input type="text" onChange={(e) => setExpense(e.target.value)} className="bg-yellow-100 lg:bg-white border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400" />
              </label>
            </div>

            <div className="form-element">
              <label className="space-y-2 w-full lg:w-4/5 block mx-auto">
                <span className="block text-lg text-gray-800 tracking-wide">Amount</span>
                <input onChange={(e) => {
                  try {
                    const kk = eval(e.target.value);
                    setAmount(kk);
                  } catch (error) {
                    window.location.reload();  // Reloads the page on error
                  }
                }} type="text" className="bg-yellow-100 lg:bg-white border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400" />
              </label>
            </div>

            <div className="form-element">
              <span className="w-full lg:w-4/5 block mx-auto ">
                {alert ? (
                  <button className='animate-pulse bg-green-400 w-full p-3'>Please wait</button>
                ) : (
                  <button onClick={() => {
                    if (amount > 0 && type !== '' && expense !== '') {
                      setAlert(true);
                      addData();
                    }
                  }} className="bg-yellow-200 cursor-pointer border-2 border-yellow-200 w-full p-3 focus:outline-none active:outline-none focus:bg-theme-yellow active:bg-theme-yellow hover:bg-theme-yellow transition-all">Submit</button>
                )}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
