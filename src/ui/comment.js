import React, { useState } from "react";
import styled from "styled-components";


const TodoTemplateBlock = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid blue;
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const Comment = styled.span`
  color: #000;
`;



// 대략적인 작업 순서, 변경 감지해서 텍스트값 받기, => 값 저장해놓기 => 출력해서 보여주기

function TodoTemplate({ children }) {

  const [userComment, setComment] = useState('') // 댓글 임시 저장 공간
  const onChange = event => setComment(event.target.value); // change 이벤트 시 댓글 임시 저장 공간에 value 값을 저장한다.

  // 기존 댓글 리스트
  const [userCommentList , setList] = useState([{ user: "penguin", content: "그러셨군요" },{ user: "penguin2", content: "그러셨군요2" },{ user: "penguin33", content: "그러셨군요3" },])

  
  const onSubmit = event => {
    event.preventDefault(); // // 서브밋 이벤트 발생 시 기본 폼 제출 동작 막기
    if (userComment === ''){ // 공백 일 시 안되게 제작
    return;
    }
    const newComment = {user : 'newUser', content : userComment} // 댓글 값을 content에 넣고 user는 newUser 통일
    setList(userCommentList => [newComment, ...userCommentList]) // 입력 받은 값을 userCommentList 값에 추가 
    setComment('') // 공백 값 입력 시 그게 전달되도록? 근데 이 위치에 있어도 되는건가?
  }

  return (
    <TodoTemplateBlock>
      {children}
      <div className="comment-wrap" onSubmit={onSubmit}>
        <form className="comment-box">
          <input type="text" placeholder="댓글을 달아주세요" onChange={onChange} value={userComment}/>
          <button className="comment-check">올리기</button>
        </form>
      </div>

      {/* 입력 값이 content에 들어가야함 */}

      {userCommentList.map((item, i) => {
        return (
          <div className="comment" key={i}>
            <Comment className="user">{item.user}</Comment>

            <Comment className="content">
              {item.content}


            </Comment>
          </div>
        );
      })}

      
    </TodoTemplateBlock>
  );
}

export default TodoTemplate;
