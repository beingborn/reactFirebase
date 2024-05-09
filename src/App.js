import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap; // 꼭 import를 해와야한다
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import bg from "./img/bg.png";
import data from "./data.js";
import { useEffect, useState , lazy} from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
import About from "./routes/About.js";
import axios from "axios";
import Cart from "./routes/Cart.js";
import Mypage from "./routes/Mypage.js";
import Loading from "./routes/Loading.js";
import { useQuery } from "react-query";


function App() {

  useEffect(()=>{
    const checkLocal = localStorage.getItem('watched')

if( checkLocal === null ) {
	localStorage.setItem('watched', JSON.stringify([]));
} else {
}
  }, [])

  let [article, setArticle] = useState(data);
  let navigate = useNavigate();
  let [count, setCount] = useState(1);


  // 유저 데이터 받아오기 
  let result = useQuery(['작명'] , ()=> {
      return axios.get('https://codingapple1.github.io/userdata.json').then((res)=>{
      return res.data
    })
  })

  let [loadUi, setloadUi] = useState(true)

  useEffect(()=>{
    if (window.location.pathname == "/Loading") {
      return setloadUi(false);
      }      
  }, [])


  console.log(loadUi)

  // 과제 로딩 페이지 진입 시 Navbar 숨기기 
  // 1. state로 상태를 저장해야할듯 , 기본 상태를 true로
  // 2. 로딩 페이지 진입 시 false로 제작하고 navBar를 선택적으로 보여주는 삼항 연산자를 사용해야할 듯함.

  // result.data 
  // result.isLoading
  // result.error

  return (
    <div className="App">
      {
        loadUi == true ? (
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">MIDOO</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/detail/0");
                }}
              >
                Detail
              </Nav.Link>
              <Nav.Link href="/cart">장바구니</Nav.Link>
            </Nav>  
            <Nav className="ms-auto white">
            </Nav>              
          </Container>
        </Navbar>)   : null
      }




      <Routes>
        <Route
          path="/"
          element={
            <div className="inner home-page">
              <p className="user-sayHello">
              { result.isLoading && '로딩중'}
              { result.error && '에러남'}
              안녕하세요 <span className="user-name">{ result.data && result.data.name}</span>님
              </p>
              <p>오늘도 좋은 하루되세요!</p>

            <Link to className="one-news">
             1분 뉴스
            </Link>
            <section className="main-catecory">
              <h2>관심 카테고리</h2>
            </section>

            </div>
          }
        />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/detail" element={<Detail article={article} />} />
        <Route path="/detail/:id" element={<Detail article={article} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mypage" element={<Mypage />} />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<>회사멤버</>} />
          <Route path="location" element={<>회사위치</>} />
        </Route>

        <Route path="*" element={<div>없는페이지임</div>} />
      </Routes>

      <div className="footer">
        <div className="inner">
        <Link to="/" className="footer-a home">홈</Link>
        <Link to="/detail/1" className="footer-a content">콘텐츠</Link>
        <Link to="/event" className="footer-a bookmark">북마크</Link>
        <Link to="/mypage" className="footer-a mypage">마이페이지</Link>
        </div>
      </div>
      {/* App */}
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="80%"
      />

      <h4>{props.article.title}</h4>
      <p>{props.article.price}</p>
    </div>
  );
}

export default App;
