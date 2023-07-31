const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");

oracledb.autoCommit = true; //commit 자동설정
//oracle 은 비동기 방식으로 처리 --> async, await 기능 무조건 사용

const ser = require("../../service/member/member_service");

const list = async (req, res) =>{
    const list = await ser.getList();
    console.log("controller list :", list);
    /*let con = await oracledb.getConnection(dbConfig);
    console.log("con :", con);
    oracledb.outFormat = oracledb.OBJECT;
    let result = await con.execute("select * from members02"); //객체를 얻어와야 전송 가능
    console.log("result :", result);*/

    res.render("member/member_index", {list} );
}

const registerForm = (req, res) =>{
    res.render("member/register_form");
}

const register = async (req, res) => {
    console.log("register : ", req.body)
    let msg = await ser.insert(req.body);
    res.send(msg);
}

const memberView = async (req, res) => {
    console.log("memberView ctrl : ", req.params);
    const member = await ser.getMember( req.params) ;
    console.log("controller memberView : ", member);
    //res.send("memberView");
    res.render("member/member_view", { member});
};

const modifyForm = async (req, res) =>{
    console.log("ctrl modify(query) : ", req.query);    // { id: 'aaa' } 출력
    console.log("ctrl modify(params) : ", req.params);  //값을 못 가져옴
    const member = await ser.getMember( req.query) ;
    console.log("ctrl modifyForm :", member);

    //res.send("modify");
    res.render("member/modify_form", {member});
};

const modify = async (req, res) => {
    console.log("ctrl modify : ", req.body);
    const msg = await ser.modify(req.body);
    res.send(msg);
};

const deleteMember = async (req, res) => {
    const msg = await ser.deleteMember(req.params);
    res.send(msg);
};

module.exports = {list, registerForm, register, memberView, modifyForm, modify, deleteMember};

    /*result : 2차원 배열로 출력
    metaData : 컬럼명 저장하는 key 값
    rows : 결과값 저장하는 key 값
    outFormat 사용해야   { ID: 'aaa', PWD: 'aaa', NAME: '홍길동', ADDR: '산골짜기' } 값을 return 해줌*/
