import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap; // 꼭 import를 해와야한다
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import bg from "./img/bg.png";
import data from "./data.js";
import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  let [article, setArticle] = useState(data);

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
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
      <Route path="/detail" element={ <div>상세페이지임</div> } />
      <Route path="/about" element={ <div>어바웃페이지임</div> } />
    </Routes>

 




      <div className="footer">
        <Link to="/">홈</Link>
        <Link to="/detail">상세페이지</Link>
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
