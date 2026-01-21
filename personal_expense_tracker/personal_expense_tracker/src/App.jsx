import { useState } from 'react'
import './App.css'

const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Other'];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [filter, setFilter] = useState('All');

  const addExpense = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || isNaN(amount)) return;
    
    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: parseFloat(amount),
      category
    };
    
    setExpenses([...expenses, newExpense]);
    setTitle('');
    setAmount('');
    setCategory(categories[0]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const filteredExpenses = filter === 'All' 
    ? expenses 
    : expenses.filter(exp => exp.category === filter);

  const totalSpent = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="app">
      <h1>Personal Expense Tracker</h1>
      
      <form onSubmit={addExpense} className="add-form">
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={30}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="total">
          Total: ₹{totalSpent.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
        </div>
      </div>

      <div className="expenses-list">
        {filteredExpenses.length === 0 ? (
          <p>No expenses {filter !== 'All' && `in "${filter}"`} category</p>
        ) : (
          filteredExpenses.map(expense => (
            <div key={expense.id} className="expense-item">
              <div className="expense-details">
                <span className="title">{expense.title}</span>
                <span className="category">{expense.category}</span>
              </div>
              <div className="expense-amount">₹{expense.amount.toLocaleString('en-IN')}</div>
              <button 
                className="delete-btn"
                onClick={() => deleteExpense(expense.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App
