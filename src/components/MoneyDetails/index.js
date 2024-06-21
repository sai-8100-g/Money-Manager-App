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
      <p>{amount}</p>
      <p>{type}</p>
      <p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          alt="delete"
          onClick={deleteListItem}
        />
      </p>
    </li>
  )
}

export default TransactionHistory
