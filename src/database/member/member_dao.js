const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;

const getList = async () => {
    oracledb.outFormat = oracledb.OBJECT;
    let con = await oracledb.getConnection(dbConfig);
    let result = await con.execute("select * from members02");
    await con.close();
    console.log("dao getList : ", result);
    return result;
};

const insert = async (body) => {
    let con = await oracledb.getConnection(dbConfig);   //DB연동 코드
    const sql = `insert into members02 values(:id, :pwd, :name, :addr)`;
    let result = 0;
    try{
      result = await con.execute(sql, body);
    console.log("dao insert : ", result);  
    }catch(err){
        console.log(err);
    }
    return result;  
};

const getMember = async (mId) => {
    let con = await oracledb.getConnection(dbConfig);   //DB연동 코드
    const sql = "select * from members02 where id =:id";
    let member;
    try{
       member = await con.execute(sql, mId);
       console.log("dao getmember : ", member);     //배열의 0번째에 원하는 값이 들어있음
    }catch(err){
        console.log(err);
    }
    return member.rows[0]; 
};

const modify = async (body) => {
    let con = await oracledb.getConnection(dbConfig);   //DB연동 코드
    const sql = `update members02 set pwd='${body.pwd}',
                name='${body.name}', addr='${body.addr}' where id='${body.id}'`;
    let result = 0;
    try{
        result = await con.execute(sql);
    }catch(err){
        console.log(err);
    }
    return result;
};

const deleteMember = async (body) =>{
    let con = await oracledb.getConnection(dbConfig);   //DB연동 코드
    const sql = "delete from members02 where id=:id";
    let result = 0;
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err);
    }
    return result;
};

module.exports = {getList, insert, getMember, modify, deleteMember};