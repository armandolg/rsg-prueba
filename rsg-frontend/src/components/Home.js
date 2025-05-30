import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';
import CurrentBalance from './CurrentBalance';
import TopExpenses from './TopExpenses';
import { getAccounts, getTransactions, getExpenses } from '../services/api';

function Home() {
    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactionsResponse = await getTransactions();
                setTransactions(transactionsResponse.data);

                const accountsResponse = await getAccounts();
                setAccounts(accountsResponse.data);

                const expensesResponse = await getExpenses();
                setExpenses(expensesResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <div className="welcome">
                <h2>Welcome to your online banking</h2>
            </div>
            <div className="dashboard">
                <div className="card">
                    <h3>Transactions History</h3>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                    <PieChart data={transactions} />
                </div>
                <div className="card">
                    <h3>Main Expenses</h3>
                    <TopExpenses expenses={expenses} />
                </div>
                <div className="card">
                    <h3>Current Balance</h3>
                    <CurrentBalance accounts={accounts} />
                </div>
            </div>
        </div>
    );
}

export default Home;