import React, { useState, useEffect } from 'react';
import { transferFunds } from '../services/api';
import { getAccounts } from '../services/api';

function Transfer() {
    const [originAccount, setOriginAccount] = useState('');
    const [destinationAccount, setDestinationAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await getAccounts();
                setAccounts(response.data);
            } catch (error) {
                console.error('Error fetching accounts', error);
            }
        };
        fetchAccounts();
    }, []);

    const handleTransfer = async () => {
        if (!originAccount || !destinationAccount || !amount) {
            setMessage('All fields are required');
            return;
        }

        try {
            const response = await transferFunds({
                originAccount,
                destinationAccount,
                amount: parseFloat(amount)
            });
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response?.data || 'Transfer failed');
        }
    };

    const handleCancel = () => {
        setOriginAccount('');
        setDestinationAccount('');
        setAmount('');
        setMessage('');
    };

    return (
        <div>
            <h2>Transfer</h2>
            <div>
                <label>Origin Account</label>
                <select
                    value={originAccount}
                    onChange={(e) => setOriginAccount(e.target.value)}
                >
                    <option value="">Select an account</option>
                    {accounts.map(account => (
                        <option key={account.id} value={account.accountNumber}>
                            ****{account.accountNumber.slice(-4)} - {account.currency}{account.balance.toFixed(2)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Destination Account</label>
                <input
                    type="text"
                    value={destinationAccount}
                    onChange={(e) => setDestinationAccount(e.target.value)}
                    maxLength={8}
                />
            </div>
            <div>
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleTransfer}>Transfer</button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Transfer;