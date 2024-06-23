import './index.css'

const TransactionHistory = props => {
  const {history, deletingListFromList} = props
  const {title, amount, type, id} = history
  const deleteListItem = () => {
    deletingListFromList(id)
  }
  return (
    <li>
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button type="button" onClick={deleteListItem} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          alt="delete"
          data-testid="delete"
        />
      </button>
    </li>
  )
}

export default TransactionHistory
