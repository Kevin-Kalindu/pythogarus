function HomeItem({expense, amount, type, date}){
    return(
        <div className="border-2 border-blue-400 grid grid-cols-4">
            <h3>{expense}</h3>
            <h3>{amount}</h3>
            <h3>{type}</h3>
            <h3>{date}</h3>
        </div>
    )
}

export default HomeItem