import React, { useState, useEffect } from 'react'

function Dashboard({ user }) {
  const [balance, setBalance] = useState(null)
  const [transferMsg, setTransferMsg] = useState('')
  const [toUser, setToUser] = useState('')
  const [amount, setAmount] = useState('')
  const [transactions, setTransactions] = useState([])

  // Fetch balance
  const fetchBalance = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/bank/balance/${user.username}`)
      if (!res.ok) {
        throw new Error('Failed to fetch balance')
      }
      const data = await res.json()
      setBalance(data)
    } catch (error) {
      alert(error.message)
    }
  }

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/bank/transactions/${user.username}`)
      if (!res.ok) {
        throw new Error('Failed to fetch transactions')
      }
      const data = await res.json()
      setTransactions(data)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    fetchBalance()
    fetchTransactions()
    // eslint-disable-next-line
  }, [user])

  // Transfer
  const handleTransfer = async (e) => {
    e.preventDefault()
    try {
      const params = new URLSearchParams({
        fromUsername: user.username,
        toUsername: toUser,
        amount
      })
      const res = await fetch(`http://localhost:8080/api/bank/transfer?${params}`, {
        method: 'POST'
      })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || 'Transfer failed')
      }
      const data = await res.text()
      setTransferMsg(data)
      setToUser('')
      setAmount('')
      // Refresh
      fetchBalance()
      fetchTransactions()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Check your balance, transfer money, and view transaction history.</p>

      <h3>Balance</h3>
      {balance !== null ? <p>{balance}</p> : <p>Loading balance...</p>}
      <button onClick={fetchBalance}>Refresh Balance</button>

      <h3>Transfer Money</h3>
      <form onSubmit={handleTransfer}>
        <input
          type="text"
          placeholder="Recipient Username"
          value={toUser}
          onChange={(e) => setToUser(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Transfer</button>
      </form>
      {transferMsg && <p>{transferMsg}</p>}

      <h3>Transaction History</h3>
      <button onClick={fetchTransactions}>Refresh Transactions</button>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.fromUser}</td>
                <td>{tx.toUser}</td>
                <td>{tx.amount}</td>
                <td>{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Dashboard
