import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TransactionItem from '../TransactionItem'

import TransactionHistory from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    options: transactionTypeOptions[0].optionId,
    titleVal: '',
    amountVal: '',
    balanceCount: 0,
    incomeCount: 0,
    expenseCount: 0,
  }

  titleInput = e => {
    this.setState({titleVal: e.target.value})
  }

  amountInput = e => {
    this.setState({amountVal: e.target.value})
  }

  selectInput = e => {
    this.setState({options: e.target.value})
    console.log(e.target.value)
  }

  onAddTransaction = () => {
    const {titleVal, amountVal, options} = this.state
    const amount = parseInt(amountVal)
    if (titleVal === '' || amountVal === '') {
      this.setState({
        errorAllMsg:
          titleVal === '' && amountVal === '' ? 'Please Enter values' : '',
        tittleErrorMsg: titleVal === '' ? 'Please Enter Title' : '',
        amountErrorMsg: amountVal === '' ? 'Please Enter Amount' : '',
      })
    } else {
      this.setState({
        errorAllMsg: '',
        tittleErrorMsg: '',
        amountErrorMsg: '',
      })
      if (options === 'INCOME') {
        this.setState(prevState => ({
          balanceCount: prevState.balanceCount + amount,
          incomeCount: prevState.incomeCount + amount,
        }))
      } else {
        this.setState(prevState => ({
          balanceCount: prevState.balanceCount - amount,
          expenseCount: prevState.expenseCount + amount,
        }))
      }
      const newTransaction = {
        id: uuidv4(),
        title: titleVal,
        amount: amountVal,
        type: options,
      }
      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, newTransaction],
        titleVal: '',
        amountVal: '',
      }))
    }
  }

  deletingListFromList = id => {
    this.setState(prevState => {
      const deletingObj = prevState.transactionList.find(
        eachObj => eachObj.id === id,
      )
      const deletingAmount = parseInt(deletingObj.amount)
      const newTransactionList = prevState.transactionList.filter(
        eachObj => eachObj.id !== id,
      )

      if (deletingObj.type === 'INCOME') {
        return {
          transactionList: newTransactionList,
          balanceCount: prevState.balanceCount - deletingAmount,
          incomeCount: prevState.incomeCount - deletingAmount,
        }
      }
      return {
        transactionList: newTransactionList,
        balanceCount: prevState.balanceCount + deletingAmount,
        expenseCount: prevState.expenseCount - deletingAmount,
      }
    })
  }

  render() {
    const {
      transactionList,
      errorAllMsg,
      tittleErrorMsg,
      amountErrorMsg,
      titleVal,
      amountVal,
      balanceCount,
      incomeCount,
      expenseCount,
      options,
    } = this.state
    return (
      <div className="main-container">
        <div className="name-container">
          <h1>Hi Richard</h1>
          <p>
            Welcome back to your
            <span> Money Manager</span>
          </p>
        </div>
        <div className="money-detail-containers">
          <div className="balance-container">
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                alt="balance"
              />
            </div>
            <div>
              <p className="balance-para">Your Balance</p>
              <p className="amount-para" data-testid="balanceAmount">
                Rs {balanceCount}
              </p>
            </div>
          </div>
          <div className="balance-container income">
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                alt="income"
              />
            </div>
            <div>
              <p className="balance-para ">Your Income</p>
              <p className="amount-para" data-testid="incomeAmount">
                Rs {incomeCount}
              </p>
            </div>
          </div>
          <div className="balance-container expense">
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png "
                alt="expenses"
              />
            </div>
            <div>
              <p className="balance-para">Your Expenses</p>
              <p className="amount-para" data-testid="expensesAmount">
                Rs {expenseCount}
              </p>
            </div>
          </div>
        </div>
        <div className="inputs-history-container">
          <div className="input-container">
            <h1>Add Transaction</h1>
            <label htmlFor="title">Title</label>
            {tittleErrorMsg && <p className="error">{tittleErrorMsg}</p>}
            <input
              id="title"
              type="text"
              placeholder="TITLE"
              onChange={this.titleInput}
              value={titleVal}
            />
            <label htmlFor="amount">AMOUNT</label>
            {amountErrorMsg && <p className="error">{amountErrorMsg}</p>}
            <input
              id="amount"
              type="number"
              placeholder="AMOUNT"
              onChange={this.amountInput}
              value={amountVal}
            />
            <label htmlFor="type">Type</label>
            <select id="type" onChange={this.selectInput} value={options}>
              {transactionTypeOptions.map(eachObj => (
                <TransactionItem optionObj={eachObj} key={eachObj.optionId} />
              ))}
            </select>
            <button
              type="button"
              className="add-transaction-btn"
              onClick={this.onAddTransaction}
            >
              Add
            </button>
            {errorAllMsg && <p className="error">{errorAllMsg}</p>}
          </div>
          <div className="history-table-container">
            <ul>
              <h1>History</h1>
              <li className="table-head">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
                <p>Delete</p>
              </li>
              {transactionList.map(eachObj => (
                <TransactionHistory
                  history={eachObj}
                  key={eachObj.id}
                  deletingListFromList={this.deletingListFromList}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
