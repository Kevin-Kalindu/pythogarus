import bike from './images/bike.png'
import Image from 'next/image'
import {useState } from 'react'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {app} from '../firbase'
import {useRouter} from 'next/router'

function Login(){
    const router = useRouter()
    const[email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth(app)


    async function Login(){
        await signInWithEmailAndPassword(auth, email, password)
        .then(() => router.push('./main'))
        .catch((err) => alert(err.message))
    }

  return(
    <div class="bg-yellow-100 overflow-x-hidden lg:overflow-x-auto lg:overflow-hidden flex items-center justify-center lg:h-screen">
       <header className=''>
                <title>Pythogarus</title>
                <script src="../components/script.js"></script>
                  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2318083812487394"
                 crossorigin="anonymous"></script>
          </header>
  <div class="container h-screen-75 bg-white w-full lg:w-4/5 border border-gray-300 rounded flex flex-wrap flex-nowrap group">
    <div class="w-full lg:w-1/2 bg-theme-yellow flex">
      <div class="product flex items-end justify-center w-full h-full relative">
        <div className="uppercase font-black text-7xl flex items center justify-center w-full h-full absolute left-0 top-0 hidden lg:block">
            <span className="-rotate-90 whitespace-nowrap w-full h-full flex items-start justify-center text-yellow-300 transition-all duration-500 ease-in-out translate-x-20 opacity-0 group-hover:translate-x-32 group-hover:opacity-100">
                What's up!!
            </span>
        </div>
        <Image src={bike}  class="transform duration-500 ease-in-out transition-all group-hover:translate-x-32 h-[600px] 2xl:h-[900px] object-cover"/>
        <div class="w-full h-6 bg-black absolute bottom-10 left-14 rounded-full bg-opacity-25 filter blur"></div>
      </div>
      <div class="hidden lg:block w-32 bg-white ml-auto"></div>
    </div>
    <div class="w-full lg:w-1/2 order-1 lg:order-2">
      <div class="form-wrapper flex items-center lg:h-full px-10 relative z-10 pt-16 lg:pt-0">
        <div class="w-full space-y-5">
          <div class="form-caption flex items-end justify-center text-center space-x-3 mb-20">
            <span class="text-3xl font-semibold text-gray-700">Login</span>
          </div>
          <div class="form-element">
            <label class="space-y-2 w-full lg:w-4/5 block mx-auto">
              <span class="block text-lg text-gray-800 tracking-wide">Email</span>
              <span class="block">
                <input type="text" onChange={(e) => setEmail(e.target.value)} class="bg-yellow-100 lg:bg-white border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400"/>
              </span>
            </label>
          </div>
          <div class="form-element">
            <label class="space-y-2 w-full lg:w-4/5 block mx-auto">
              <span class="block text-lg text-gray-800 tracking-wide">Password</span>
              <span class="block">
                <input onChange={(e) => setPassword(e.target.value)} type="password" class="bg-yellow-100 lg:bg-white border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400"/>
              </span>
            </label>
          </div>
          <div class="form-element">
            <span class="w-full lg:w-4/5 block mx-auto ">
              <button onClick={() => Login()} class="cursor-pointer border-2 border-yellow-200 w-full p-3 bg-yellow-200 focus:outline-none active:outline-none focus:bg-theme-yellow active:bg-theme-yellow hover:bg-theme-yellow transition-all">Submit</button>
            </span>
          </div>
          <div className='form-element'>
            <button onClick={() => router.push('./')} className='text-blue-500'>Back</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    )
}

export default Login
