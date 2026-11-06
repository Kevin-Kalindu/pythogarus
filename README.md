
# Pythogarus

**A personal finance and expense-tracking application built with Next.js and Firebase.**

Pythogarus is a web-based expense management application designed to help users record, organize, and monitor their spending. It provides a centralized dashboard for viewing financial activity, managing expense records, and keeping track of spending across different years.

## Features

- **Expense Tracking** – Record expenses with descriptions, amounts, dates, and categories.
- **Year-Based Records** – Organize financial records by year and switch between different years.
- **Expense Dashboard** – View recent transactions in a centralized dashboard.
- **Real-Time Updates** – Retrieve and display expense records using Firebase Firestore real-time listeners.
- **Expense Management** – Add and delete individual expense records.
- **Category Selection** – Organize expenses using predefined expense categories.
- **Authentication** – Secure access to the application through Firebase Authentication.
- **Spending Overview** – View total spending alongside account and date information.
- **Responsive Interface** – A dashboard and navigation interface designed using Tailwind CSS.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 13 | React framework and application routing |
| React 18 | Component-based user interface |
| Firebase Authentication | User authentication |
| Cloud Firestore | Expense data storage and real-time updates |
| Firebase Storage | File storage integration |
| Recoil | Global state management |
| Tailwind CSS | Utility-first styling |
| React Icons | Interface icons |

## Application Structure

```text
pythogarus/
│
├── atoms/
│   └── modalAtoms.js
│
├── components/
│   ├── Accounts.js
│   ├── Header.js
│   ├── Sidebar.js
│   ├── StatusCard.js
│   ├── Loading.js
│   └── ...
│
├── pages/
│   ├── index.js
│   ├── login.js
│   ├── main.js
│   ├── add.js
│   ├── images/
│   └── api/
│
├── public/
├── styles/
│
├── firbase.js
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## How It Works

### 1. Year Selection
Users select a financial year from the landing page. The selected year is stored in browser session storage and used to access the corresponding Firestore collection.

### 2. Authentication
Firebase Authentication handles user sign-in. Protected application pages check the authentication state before displaying the dashboard.

### 3. Expense Recording
Users can submit an expense by providing:
- Expense description
- Amount
- Date
- Expense category

The application stores the transaction in the selected year's Firestore collection, including a timestamp for chronological ordering.

### 4. Dashboard
The dashboard retrieves recent expense records from Firestore and displays them in a transaction table. Real-time listeners keep the displayed records synchronized with database changes.

### 5. Expense Management
Users can remove individual transactions directly from the dashboard.

## Firebase Configuration

The application uses Firebase Authentication, Cloud Firestore, and Firebase Storage.

Configure the following environment variables in a `.env.local` file:

```env
NEXT_FIREBASE_API_KEY=
NEXT_FIREBASE_AUTH_DOMAIN=
NEXT_FIREBASE_PROJECT_ID=
NEXT_FIREBASE_STORAGE_BUCKET=
NEXT_FIREBASE_SENDER_ID=
NEXT_FIREBASE_APP_ID=
```

These values should correspond to your Firebase project configuration.

## Development

The project uses Next.js and npm scripts for development and production builds.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

To create a production build:

```bash
npm run build
npm run start
```

## Deployment

The application is configured as a Next.js project and can be deployed using platforms that support Next.js, including Vercel.

Live Application: https://pythogarus.vercel.app/

## Author

**Kevin Hettiarachchi**

GitHub: [Kevin-Kalindu](https://github.com/Kevin-Kalindu)

---

*Pythogarus — Making personal expense tracking simpler and more organized.*
