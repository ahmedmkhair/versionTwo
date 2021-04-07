/**
 
* @jest-enviroment node

*/

const { test, expect } = require("@jest/globals");
let axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');
let mysql = require('mysql')

const connection = async () => new Promise(
    (resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'emrgingtrend'
        });
        connection.connect(error => {
            if (error) {
                reject(error);
                return;
            }
            resolve(connection);
        })
    }
);
const query = async (conn, q, params) => new Promise(
    (resolve, reject) => {
        const handler = (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        }
        conn.query(q, params, handler);
    }
);
const testConnection = async (con, qu) => {
    let result = await query(con, qu)
    con.end()
    return result
}

(async () => {
    await testConnection(await connection(), `delete from chat`)
    await testConnection(await connection(), `delete from messages`)
})()

//testing case title
test('Test login successfuly', async () => {

    // login with user and password to get a token
    let res = await axios.post('http://localhost:3000/api/login', {
        username: 'seif',
        password: '123'
    }
    ).catch(function (e) {

        expect(e.response.status).toBe(401)
    })
    expect(res.status).toBe(200)
})

test('failed to login', async () => {

    // login with user and password to get a token
    let res = await axios.post('http://localhost:3000/api/login', {
        username: 'seif',
        password: '12345'
    }
    ).catch(function (error) {
        expect(error.response.status).toBe(401)

    })
})

test('get friend list', async () => {
    let res = await axios.post('http://localhost:3000/api/login', {
        username: 'seif',
        password: '123'
    }
    ).catch(function (e) {
        expect(e.response.status).toBe(401)
    })
    let token = res.data
    await testConnection(await connection(), `insert into chat values (1, '66666662', '66666663')`)
    let getdata = await axios.get("http://localhost:3000/api/v1.0/contacts",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(function (e) {
            expect(e.response.status).toBe(403)
        })
    let info = [getdata.data.contacts[0].name, getdata.data.contacts[0].phoneNum]
    expect(info).toEqual(['ahmed', '66666663'])
})

test('send message', async () => {

    // login with user and password to get a token
    let res = await axios.post('http://localhost:3000/api/login', {
        username: 'seif',
        password: '123'
    })

    let token = res.data
    expect(res.status).toBe(200)


    let messages = await testConnection(await connection(), `select * from messages`)
    expect(messages.length).toBe(0)

    let getdata = await axios.post('http://localhost:3000/api/sendMessage', {
        sender: "66666662",
        message: "hello from tester",
        receiver: "66666663",
        cid: "1",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    // check the db if it got the message
    messages = await testConnection(await connection(), `select * from messages`)
    expect(messages.length).toBe(1)
    expect(messages[0].message).toEqual('hello from tester')
    expect(getdata.status).toBe(200)
})

test('get chat', async () => {
    let res = await axios.post('http://localhost:3000/api/login', {
        username: 'seif',
        password: '123'
    }
    ).catch(function (e) {
        expect(e.response.status).toBe(401)
    })
    let token = res.data

    let getdata = await axios.post('http://localhost:3000/api/getConv', {
        sender: "66666662",
        receiver: "66666663",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    
    // check the api if it reads the messages correctly
    expect(getdata.data.userChat[0].message).toBe('hello from tester')
})

