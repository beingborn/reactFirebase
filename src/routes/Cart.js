import {Table} from "react-bootstrap" 
import { useState } from "react"
import { useSelector } from "react-redux"

function Cart(){
  let [bookmark, setBook] = useState(["오징어", "낙지"])

  let a = useSelector((state)=>{return state})
  console.log(a.stock[0])

  return(


<div>
<Table>
  <thead>
    <tr>
      <th>{bookmark[0]}</th>
      <th>{a.user}</th>
      <th>{a.stock[0]}</th>
      <th>변경하기</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>안녕</td>
      <td>안녕</td>
      <td>안녕</td>
    </tr>
  </tbody>
</Table> 
</div>    
  )
}

export default Cart