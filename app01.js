const express = require('express');
const app = express();
let con;
app.get("/", (req, res) => {
    console.log("1. 연동 전");
    con = connect();
    con.then((msg)=>{
        console.log("3. 연동 완료 후 특정기능 사용");
        res.send("con =>" + msg);
    });    //Promise 사용 시 추가
        //console.log("3. 연동 완료 후 특정기능 사용"); (con.the 작성 전)
        //res.send("con =>" + con);  (con.the 작성 전)
});
//변형 버전(then을 간략히 사용)
app.get("/async", async (req, res) => {    //async : 비동기 방식으로 처리되는 함수가 있다고 선언
    console.log("1. 연동 전");
    con = await connect();  //비동기 함수 앞에 await 붙여주기 (결과값이 돌아올 때까지 기다림)
    console.log("3. 연동 완료 후 특정기능 사용");
    res.send("con =>" + con);
       //Promise 사용 시 추가
        //console.log("3. 연동 완료 후 특정기능 사용"); (con.the 작성 전)
        //res.send("con =>" + con);  (con.the 작성 전)
});

const connect = () => {
    let msg;    // Promise : 비동기식처리 방식을 동기방식으로 돌려줌
    return new Promise ((resolve) => setTimeout(() => {  
        msg = "DB연동 되었습니다!!!";
        console.log("2. DB연동 하는 중...");
        resolve(msg);
    }, 1000) );
    //return msg;
}

app.listen(3000, ()=> { console.log("oracle_test server success!!!"); });

//동기 방식으로 실행
/*const connect = () => {
    let msg;
    msg = "DB연동 되었습니다!!!";
    console.log("2. DB연동 하는 중...");
    return msg;
};*/

//비동기 방식으로 진행 --> 1초후에 실행 --> msg가 null값으로 return --> undefined 출력
//출력 순서 1 -> 3 -> 2
/*const connect = () => {
    let msg;
    setTimeout(() => {  
        msg = "DB연동 되었습니다!!!";
        console.log("2. DB연동 하는 중...");
    }, 1000);
    return msg;
};
*/ 