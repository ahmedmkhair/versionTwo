/**
 
* @jest-enviroment node

*/

const { test, expect } = require("@jest/globals");
let axios = require('axios')
//let mysql = require('mysql')
axios.defaults.adapter = require('axios/lib/adapters/http');
jest.setTimeout(30000);


// testing case title
test('Test login successfuly', async () => {

    // login with user and password to get a token
    let res = await axios.post('http://localhost:3000/api/login', {
        username: 'ali',
        password: '123'
    }
    )
    expect(res.status).toBe(200)
    // expect(res.data.msg).toBe("ok")
})
test('Test failed login', async () => {

    // login with user and password to get a token
    let res = await axios.post('http://localhost:3000/api/login', {
        username: 'ali',
        password: '1234'
    }
    ).catch(function (e){
        expect(e.response.status).toBe(401)
    })
    
   // expect(res.status).toBe(403)

    // expect(res.data.msg).toBe("ok")
})


// test('failed to login', async () => {

//     // login with user and password to get a token
//     let res = await axios.post('http://localhost:3000/api/login', {
//         username: 'ali',
//         password: '12345'
//     }
//     ).catch(function (error) {
//         console.log(res.status)
//         expect(error.response.status).toBe(401)

//     })
// })




test('get chat list', async () => {

    // login with user and password to get a token
    let res = await axios.post('http://localhost:3000/api/login', {
        username: 'ali',
        password: '123'
    }
    )
    // expect(res.data.msg).toBe("ok")
    let token = res.data
    let getdata = await axios.get("http://localhost:3000/api/v1.0/contacts",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(getdata.status)
    expect(res.status).toBe(200)


})



test('get chat', async () => {

    // login with user and password to get a token
    let res = await axios.post('http://localhost:3000/api/login', {
        username: 'ali',
        password: '123'
    }
    )
    // expect(res.data.msg).toBe("ok")
    let token = res.data
    let getdata = await axios.post('http://localhost:3000/api/getConv', {
        sender: "66666662",
        receiver: "66666661",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(getdata.status)
    expect(res.status).toBe(200)


})

test('send message', async () => {

    // login with user and password to get a token
    let res = await axios.post('http://localhost:3000/api/login', {
        username: 'ali',
        password: '123'
    }
    )
    // expect(res.data.msg).toBe("ok")
    let token = res.data
    let getdata = await axios.post('http://localhost:3000/api/sendMessage', {
        sender: "66666662",
        message: "hello from tester",
        receiver: "66666661",
        cid: "1",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(getdata.status)
    expect(res.status).toBe(200)


})

///////////////////////////////////////////////////////////////////////
// let getdata = await axios.get("http://localhost:3000/api/v1.0/contacts",
// {
//     headers: {
//         Authorization: `Bearer ${res}`
//     }
// }).then((response) => {
//     //console.log(response.data)
//     let status = response.status
//    // console.log(status)



//     expect(status).toBe(200)
//     done();

// }).catch(function (error) {
//      console.log(error)
// });

//     let getdata2 = await axios.post('/api/getConv', {

//     }).then((response) => {
//         //console.log(response.data)
//         let status = response.status
//         //console.log(status)

//         expect(status).toBe(200)
//         //done();

//     }).catch(function (error) {
//         // console.log(error)
//     });

//     let getdata3 = await axios.post('/api/sendMessage', {
//     }).then((response) => {
//         //console.log(response.data)
//         let status = response.status
//         console.log(getdata3)

//         expect(status).toBe(200)
//         //done();

//     }).catch(function (error) {
//         // console.log(error)
//     });

//     let getdata4 = await axios.put('/patients/:id/password',{
//         username: 'saif',
//         password: '123'
//     }).then((response) => {
//         //console.log(response.data)
//         let status = response.status
//         //console.log(status)

//         expect(status).toBe(200)
//         //done();

//     }).catch(function (error) {
//         //console.log(error)
//     });

// });
///////////////////////////////////////////////////////////////////////
    // // save the token
    // let token = res.data
    // // console.log(token)
    // // test get the information in the main page
    // res = await axios.get('http://localhost:3000/api/v1.0/contacts', {
    //     // withCredentials: true,
    //     headers: {
    //         'Authorization': 'Bearer ' + token
    //     },
    // })
    // res.setHeader('Access-Control-Allow-Credentials',true);
    // if success, receive the data and do ........
    // console.log(res.data)
    //     } catch (e) {
    //     // if got error like 401, print the status number
    //     console.log('Error status is: ', e.status)
    //     expect(res.status).toBe(401);
    // }
    // title('>> End Test ')

