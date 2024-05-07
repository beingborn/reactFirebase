import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap; // 꼭 import를 해와야한다
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import bg from "./img/bg.png";
import data from "./data.js";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
import About from "./routes/About.js";
import axios from "axios";
import Cart from "./routes/Cart.js";

function App() {
  // let obj = { name: "Lee" };
  // let localData = JSON.stringify(obj); // array, object JSON 변환
  // localStorage.setItem("data", localData);
  // let getData = localStorage.getItem("data")

  // let arrayJson = JSON.parse(getData) // parse => object, array로 변경
  // console.log(arrayJson.name) // Lee

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

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
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
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {article.map((a, i) => {
                    return <Card article={article[i]} i={i}></Card>;
                  })}
                </div>
                {count == 1 ? (
                  <button
                    onClick={() => {
                      setCount(count + 1);
                      axios
                        .get("https://codingapple1.github.io/shop/data2.json")
                        .then((result) => {
                          let copy = [...article, ...result.data];
                          setArticle(copy);
                        })
                        .catch(() => {
                          console.log("데이터요청에 실패함");
                        });
                    }}
                  >
                    더보기
                  </button>
                ) : count == 2 ? (
                  <button
                    onClick={() => {
                      setCount(count + 1);
                      axios
                        .get("https://codingapple1.github.io/shop/data3.json")
                        .then((result) => {
                          let copy = [...article, ...result.data];
                          setArticle(copy);
                        })
                        .catch(() => {
                          console.log("데이터요청에 실패함");
                        });
                    }}
                  >
                    더보기
                  </button>
                ) : null}
              </div>
            </>
          }
        />
        <Route path="/detail" element={<Detail article={article} />} />
        <Route path="/detail/:id" element={<Detail article={article} />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<>회사멤버</>} />
          <Route path="location" element={<>회사위치</>} />
        </Route>

        <Route path="*" element={<div>없는페이지임</div>} />
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
