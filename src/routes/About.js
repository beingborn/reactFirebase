import { Outlet } from 'react-router-dom'

function About(){
  return(
    <div>
          <h4>회사하이요</h4>
          <Outlet></Outlet>
    </div>
  )
}

export default About