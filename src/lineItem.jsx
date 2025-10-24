import { FaTrashAlt } from "react-icons/fa";

const lineItem = ({item, handleCheck, handleDelete}) => {
  return (
    <li className="item">
        <input
            id={item.id}
            type="checkbox" 
            checked= {item.checked} 
            onChange={() => handleCheck(item.id)}
        />
        <label 
        htmlFor={item.id}
        style={(item.checked) ? {textDecoration: 'line-through'} : null}
        >
          {item.items}
        </label>
        <FaTrashAlt
        onClick={() => handleDelete(item.id)}
            role = "button"
            tabIndex = "0"
        />
    </li>
  )
}

export default lineItem