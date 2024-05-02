import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap; // 꼭 import를 해와야한다
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import bg from "./img/bg.png";
import data from "./data.js";
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from "./routes/Detail.js"
import About from "./routes/About.js"

function App() {
  let [article, setArticle] = useState(data);
  let navigate = useNavigate();


  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate("/")}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate("/detail/0")}}>Detail</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    <Routes>
      <Route path="/" element={ <>
        <div className="main-bg"></div>
        <div className="container">
          <div className="row">
          { article.map((a, i)=>{
            return <Card article={article[i]} i={i} ></Card>
          })}
        </div>
        </div>
        
      </> } />
      <Route path="/detail" element={ <Detail article={article} /> } />
      <Route path="/detail/:id" element={ <Detail article={article}/> }/>
      
      <Route path="/about" element={ <About/> } >
        <Route path="member" element={ <>회사멤버</> } />
        <Route path="location" element={ <>회사위치</> } />
      </Route>




      <Route path="*" element={ <div>없는페이지임</div> } />
    </Routes>

 




      <div className="footer">
        <Link to="/">홈</Link>
        <Link to="/detail/1">상세페이지</Link>
        <Link to="/event">이벤트페이지</Link>
      </div>
{/* App */}
    </div>
    
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + (props.i + 1 )+ ".jpg"}
        width="80%"
      />
      <h4>{props.article.title}</h4>
      <p>{props.article.price}</p>
      <button>버튼입니다</button>
    </div>
  );
}

export default App;
