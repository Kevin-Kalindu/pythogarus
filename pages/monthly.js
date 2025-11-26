import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "../firbase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import { collection, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";
import { HiArrowLeft, HiArrowRight, HiOutlineCalendar, HiOutlineClock, HiOutlineUser } from "react-icons/hi";
import MonthlyAccounts from "../components/MonthlyAccounts";

function Monthly() {
  // YEAR COLLECTION
  const storedYear = typeof window !== "undefined" ? sessionStorage.getItem("year") : null;
  const currentYear = new Date().getFullYear();
  const open = storedYear || currentYear.toString();
  const collectionRef = collection(db, open);

  // DATE VALUES
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  // STATES
  const [posts, setPosts] = useState([]);
  const [logged, setLogged] = useState(false);
  const [month, setMonth] = useState(mm);
  const [types, setTypes] = useState([]);
  const [totals, setTotals] = useState({});
  const router = useRouter();
  const auth = getAuth(app);

  // COLORS
  const colors = ["accent-green", "accent-blue", "accent-red", "accent-orange", "accent-purple", "yellow-300"];

  // LOAD TYPES FROM FIRESTORE (dynamic categories)
  useEffect(() => {
    async function loadTypes() {
      const ref = doc(db, "your_collection", sessionStorage.getItem('year'));
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const arr = snap.data().types;

        const initialTotals = { Total: 0 };
        arr.forEach(t => {
          initialTotals[t] = 0;
          initialTotals[`Total${t}`] = 0;
        });

        setTypes(arr);
        setTotals(initialTotals);
      }
    }

    loadTypes();
  }, []);

  // AUTH CHECK
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setLogged(true);
      else router.push("./login");
      try{
        sessionStorage.getItem('year')
      }catch{
        router.push('./')
      }
    });
  }, []);

  // LOAD POSTS FOR CURRENT MONTH
  useEffect(() => {
    const monthRef = query(collectionRef, where("month", "==", month));

    const unsub = onSnapshot(monthRef, data => {
      setPosts(data.docs.map(item => ({ ...item.data(), id: item.id })));
    });

    return () => unsub();
  }, [month]);

  // CALCULATE TOTALS WHEN POSTS OR TYPES CHANGE
  useEffect(() => {
    if (types.length === 0) return;

    const newTotals = { Total: 0 };

    types.forEach(t => {
      newTotals[t] = 0;
      newTotals[`Total${t}`] = 0;
    });

    posts.forEach(item => {
      const name = item.type;
      const amount = Number(item.amount) || 0;

      if (newTotals[name] !== undefined) {
        newTotals[name] += amount;
        newTotals[`Total${name}`] += 1;
        newTotals.Total += amount;
      }
    });

    setTotals(newTotals);
  }, [posts, types]);

  // CHANGE MONTH HANDLER
  const changeMonth = newMonth => setMonth(newMonth);

  // UI
  return (
    <div>
      {logged ? (
        <div className="bg-gray-800 flex w-full min-h-screen font-sans">
          <Sidebar page={"monthly"} />

          <main className="flex flex-col flex-1 gap-6 p-4">
            <header>
              <h1 className="text-3xl font-semibold leading-loose text-white">Monthly Report</h1>
            </header>

            {/* Top Cards */}
            <div className="flex gap-6">
              <div className="flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <HiOutlineUser className="text-white" />
                  </div>
                  <span className="text-accent-green pr-4 font-medium">Authorized</span>
                </div>
                <div className="text-3xl font-semibold text-white">{auth.currentUser.email}</div>
              </div>

              <div className="flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <HiOutlineCalendar className="text-white" />
                  </div>
                  <span className="text-accent-blue pr-4 font-medium">Total spent</span>
                </div>
                <div className="text-3xl font-semibold text-white">{totals.Total || 0}</div>
              </div>

              <div className="flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <HiOutlineClock className="text-white" />
                  </div>
                  <span className="text-accent-red pr-4 font-medium">Today is</span>
                </div>
                <div className="text-3xl font-semibold text-white">{`${dd}/${mm}/${yyyy}`}</div>
              </div>
            </div>

            {/* Month Selector & Table */}
            <div className="p-6 bg-gray-900 rounded-lg">
              <div className="flex justify-between text-white text-xl">
                <div>{month}</div>

                <div className="flex gap-x-2">
                  <div
                    onClick={() => changeMonth(month - 1 <= 0 ? 12 : month - 1)}
                    className="border p-2 cursor-pointer"
                  >
                    <HiArrowLeft />
                  </div>
                  <div
                    onClick={() => changeMonth(month + 1 >= 13 ? 1 : month + 1)}
                    className="border p-2 cursor-pointer"
                  >
                    <HiArrowRight />
                  </div>
                </div>
              </div>

              <div className="mx-4 mt-4">
                <div className="mb-2 text-center text-xl text-white grid grid-cols-4">
                  <h3>Type</h3>
                  <h3>Amount</h3>
                  <h3>Number</h3>
                </div>

                <div className="text-center flex flex-col space-y-4">
                  {types.map((t, index) => (
                    <MonthlyAccounts
                      key={t}
                      month={month}
                      name={t}
                      amount={totals[t]}
                      number={totals[`Total${t}`]}
                      color1={colors[index % colors.length]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Monthly;
