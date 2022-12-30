function MonthlyAccounts({amount, name, number, color1}){
    const color = 'blue-300'
    return(
        <div className={`grid grid-cols-3 rounded-full text-lg bg-gray-800 text-gray-100`}>
            <p className="py-2">{name}</p>
            <p className="py-2">{amount}</p>
            <p className="py-2">{number}</p>
        </div>
   
    )
}

export default MonthlyAccounts