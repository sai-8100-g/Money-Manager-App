import './index.css'

const TransactionItem = props => {
  const {optionObj} = props
  const {displayText, optionId} = optionObj
  return <option value={optionId}>{displayText}</option>
}

export default TransactionItem
