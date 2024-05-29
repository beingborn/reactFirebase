import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap; // 꼭 import를 해와야한다
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import bg from "./img/bg.png";
import data from "./data.js";
import { useEffect, useState, lazy } from "react";
import { Routes, Route, Link, useNavigate, Outlet, useHistory } from "react-router-dom";
import Detail from "./routes/Detail.js";
import About from "./routes/About.js";
import Test from "./test.js";
import axios from "axios";
import Cart from "./routes/Cart.js";
import Mypage from "./routes/Mypage.js";
import Loading from "./routes/Loading.js";
import { useQuery } from "react-query";
import { count } from "firebase/firestore";


function App() {
  useEffect(() => {
    const checkLocal = localStorage.getItem("watched");

    if (checkLocal === null) {
      localStorage.setItem("watched", JSON.stringify([]));
    } else {
    }
  }, []);

  let [article, setArticle] = useState(data);

  let navigate = useNavigate();

  // const navigateToDetail = (i) => {
  //   navigate(`/detail/${i}`);
  // }




  let [count, setCount] = useState(0);

  // 유저 데이터 받아오기
  let result = useQuery(["작명"], () => {
    return axios
      .get("https://beingborn.github.io/gitImage/userdata.json")
      .then((res) => {
        return res.data;
      });
  });



  let [loadUi, setloadUi] = useState(true);

  useEffect(() => {
    if (window.location.pathname == "/Loading") {
      return setloadUi(false);
    }


    // const body = document.querySelector("body");
    // const sub_h = document.querySelector(".sub_h");
    //let wh = window.innerHeight;

    //alert(window.innerHeight);

    // sub_h.style.height = wh - (body.scrollHeight - wh);
  }, []);

  const backgroundColor = {
    backgroundColor: "#151515",
  };

  const naverIcon = {
    display: "inline-block",
    width: "40px",
    height: "40px",
    // backgroundColor:"blue",
    marginLeft: "32px",
    // backgroundImg : "url(/public/devicon_google.svg)",
  };

  return (
    <div className="App" style={backgroundColor}>
      <div className="main-bg"></div>
      <div className="inner">
        {loadUi == true ? (
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
                  Article
                </Nav.Link>

                <Nav.Link href="/cart">Bookmark</Nav.Link>
              </Nav>
              <Nav className="ms-auto white">
                <p className="user-sayHello">
                  {result.isLoading && "로딩중"}
                  {result.error && "에러남"}
                  안녕하세요{" "}
                  <span className="user-name">
                    {result.data && result.data.name}
                  </span>
                  님
                </p>
              </Nav>
            </Container>
          </Navbar>
        ) : null}

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <MainText></MainText>
                <h2 className="col-title">
                  Article
                  <span
                    style={{
                      fontSize: "32px",
                      color: "gray",
                      paddingLeft: "12px",
                    }}
                  >
                    9
                  </span>
                </h2>

                <div className="col-wrap">
                  {article.map((a, i) => {
                    return (
                      <>
                      <Card article={article[i]} i={i} count={count} navigate={navigate}></Card>
                      </>
                    );
                  })}
                </div>

                  <p style={{width : "100vw", marginLeft : "calc(-50vw + 50%)", height: "400px", position : "relative", marginBottom: "80px", marginTop: "120px"}}>
                    <video style={{objectFit : "cover"}} width="100%" height="100%" loop autoPlay muted >
                        <source src="/video/space-video.mp4" type="video/mp4" />
                    </video>
                    <div className="video-bg" style={{width:"100%", height:"100%", backgroundColor : "black", opacity: "0.8", position: "absolute", left : "0", top: "0"}}></div>
                    <div className="video-text" style={{position : "absolute", top: "50%", left: "50%", transform : "translate(-50%, -50%)", textAlign: "center"} }>
                      <h4 style={{fontFamily: "ZenDots" , fontSize : "44px"}}>MY FIRST VIDEO TAG IN REACT</h4>
                      <p style={{fontSize: "20px"}}>please subscribing my blog!</p>
                      <button className="subscribe">subscribe</button>
                    </div>
                  </p>

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
          <div className="foot-top">
            <div>
              <Link to="/" className="footer-a home">
                이용약관
              </Link>
              <Link to="/detail/1" className="footer-a content">
                개인정보처리방침
              </Link>
              <Link to="/event" className="footer-a bookmark">
                북마크
              </Link>
              <Link to="/mypage" className="footer-a mypage">
                마이페이지
              </Link>
            </div>
            <small>2024@copyright-all deserved</small>
          </div>
          <div className="foot-bottom">
            <SelectBox></SelectBox>
            <Icon naverIcon={naverIcon}></Icon>
          </div>
        </div>
        {/* App */}
      </div>
    </div>
  );
}

// 현재 구현해야할 것 우선 props로 count를 함께 받아와야할 것 같음.. 그래야 해당 카운트를 늘릴 수 있으니까 데이터 자료에 포함되어야할 것같고
// 해당 count를 useState에 담아서 놓고 함수를 통해 임의로 그걸 + 1 해야겠음.



function Card(props) {
  let [likeCount, setLikeCount] = useState(props.article.like);
  return (
    <div className="card-item" style={{cursor:"pointer"}} key={props.i} >
      <div className="card-click" onClick={() => {props.navigate(`/detail/${props.article.id}`);}}>
        <img
        src={
            "https://beingborn.github.io/gitImage/space-" + (props.i + 1) + ".jpg"
          }
        />
        <h4 className="article-title">{props.article.title}</h4>
        <p className="article-content">{props.article.content}</p>
      </div>
      <p className="article-bottom">
        <span className="author-info">
          {props.article.date} {props.article.author}</span>

        <span>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              setLikeCount(likeCount + 1);
            }}
            className="heartIcon"
          >
            {likeCount}
          </a>
        </span>
      </p>
    </div>
  );
}

function MainText() {
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

          <div className="scroll-info">
            <p>scroll page</p>
          </div>
        </section>
      </div>
    </>
  );
}

const SelectBox = () => {
  return (
    <select className="select-box">
      <option key="korean" value="korean">
        한국어
      </option>
      <option key="english" value="english">
        영어
      </option>
      <option key="japanese" value="japanese">
        일본어
      </option>
      <option key="chinese" value="chinese">
        중국어
      </option>
    </select>
  );
};

function Icon(props) {
  return (
    <div className="sns-wrap">
      <a className="google" href="https://google.com" style={props.naverIcon}>
        <img src="/devicon_google.svg"></img>
      </a>
      <a className="kakao" href="https://kakao.com" style={props.naverIcon}>
        <img src="/devicon-kakao.svg"></img>
      </a>
      <a className="naver" href="https://naver.com" style={props.naverIcon}>
        <img src="/devicon-naver.svg"></img>
      </a>
    </div>
  );
}

export default App;
