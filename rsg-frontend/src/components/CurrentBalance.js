import React from 'react';

function CurrentBalance({ accounts }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Account No.</th>
                    <th>Balance</th>
                    <th>Date of Latest Transfer</th>
                </tr>
            </thead>
            <tbody>
                {accounts.map(account => (
                    <tr key={account.id}>
                        <td>****{account.accountNumber.slice(-4)}</td>
                        <td>{account.currency} {account.balance.toFixed(2)}</td>
                        <td>{account.latestTransferDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CurrentBalance;