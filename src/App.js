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
import Test from "./test.js";
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


  const backgroundColor = { 
    backgroundColor : '#151515',
  }

  return (
    <div className="App" style={backgroundColor}>
      <div className="inner">
      {
        loadUi == true ? (
        <Navbar bg="$gray-700" variant="dark">
          <Container>
            <Navbar.Brand href="#home">MINIBLOG</Navbar.Brand>
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
            <p className="user-sayHello">
              { result.isLoading && '로딩중'}
              { result.error && '에러남'}
              안녕하세요 <span className="user-name">{ result.data && result.data.name}</span>님
              </p>
            </Nav>              
          </Container>
        </Navbar>)   : null
      }






      <Routes>
        <Route
          path="/"
          element={
            <div>
           <MainText></MainText>
               <div className="col-wrap">
               {article.map((a, i) => {
                        return <Card article={article[i]} i={i}></Card>;
                })}
                </div>
           </div>
           


          }
        />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/detail" element={<Detail article={article} />} />
        <Route path="/detail/:id" element={<Detail article={article} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/test" element={<Test />} />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<>회사멤버</>} />
          <Route path="location" element={<>회사위치</>} />
        </Route>

        <Route path="*" element={<div>없는페이지임</div>} />
      </Routes>

      <div className="footer">
        <div className="inner">
        <Link to="/" className="footer-a home">이용약관</Link>
        <Link to="/detail/1" className="footer-a content">개인정보처리방침</Link>
        <Link to="/event" className="footer-a bookmark">북마크</Link>
        <Link to="/mypage" className="footer-a mypage">마이페이지</Link>
        </div>
      </div>
      {/* App */}
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div className="card-item">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        
      />
      <h4>{props.article.title}</h4>
      <p>{props.article.price}</p>
    </div>
  );
}

function MainText(){
  return (
    <>
     <div className="inner home-page">
            
            <section className="main-category">
              <div className="title-group">
                  <h2 className="main-title">MINI-NOTICE</h2>
                  <div className="main-sub">
                    <p>UXUI TREND</p>
                    <p className="reflect-font">BEST OF 2023</p>
                    <p>MINIMALISM</p>
                  </div>
                  <div className="main-sub">
                    <p>NEUMORPHISM</p>
                    <p className="reflect-font">HTML</p>
                    <p>TEXTURE FONTS</p>
                  </div>
              </div>
            </section>

            </div>
    </>
  )
}

export default App;
