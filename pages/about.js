import styles from '../styles/Land.module.css'
import Header from '../components/Header'

function about(){
    return(
        <div className={styles.main}>
             <header className=''>
                <title>Pythogarus</title>
                <script src="../components/script.js"></script>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2318083812487394"
             crossorigin="anonymous"></script>
          </header>
            <Header page={'About'}/>
            <div className={styles.sec}>
                    <h2>Master Your Finances with Our Innovative Finance App: Tracking, Insights, and Excel Export </h2>
                    <p>Introducing our revolutionary finance app, designed to empower you with the ultimate control over your financial journey. With our user-friendly platform, you can effortlessly track and manage your daily expenses, gaining a deeper understanding of your spending habits. Say goodbye to financial uncertainty and hello to financial clarity as you embark on your path towards financial wellness.

Our finance app offers an array of powerful features that make managing your money a breeze. Easily input your daily expenses, categorize them, and watch as our intelligent algorithms transform your data into insightful reports. These reports provide you with a comprehensive overview of your spending patterns, allowing you to make informed decisions about your finances. Whether you're looking to cut unnecessary expenses, save more, or invest wisely, our app has you covered.

But that's not all – we understand the importance of flexibility and convenience. That's why we've incorporated a seamless export feature that allows you to download your financial data in Excel format. This feature enables you to further analyze your financial information, create custom reports, or even share your data with financial advisors or accountants effortlessly. Take control of your financial future with our finance app, where financial empowerment is just a click away.
                        To use our app please contact us through our email: kevinhettiarrachchi5@gmail.com. 
    </p>
                </div>
        </div>
    )
}

export default about
