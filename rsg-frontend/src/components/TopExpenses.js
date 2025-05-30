import React from 'react';

function TopExpenses({ expenses }) {
    return (
        <div>
            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. ...</p>
            <ol>
                {expenses.map(expense => (
                    <li key={expense.id}>
                        {expense.destinationAccount}: {expense.currency} {expense.amount.toFixed(2)}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default TopExpenses;