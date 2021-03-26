let axios = require('axios')
const border = () => '--------------------------------------------------'
const title = t => console.log(border() + '\n' + t + '\n' + border())

const testLogin = async () => {
    // testing case title
    title('Test get info in index page')
    try {
        // login with user and password to get a token
        let res = await axios.post('http://localhost:3000/api/login', {
            username: 'Haitham',
            password: 'abc'
        })

        // save the token
        let token = res.data
        // console.log(token)
        // test get the information in the main page
        res = await axios.get('http://localhost:3000/api/v1.0/contacts', {
            // withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        // res.setHeader('Access-Control-Allow-Credentials',true);
        // if success, receive the data and do ........
        console.log(res.data)
    } catch (e) {
        // if got error like 401, print the status number
        console.log('Error status is: ', e.response.status)
    }
    title('>> End Test ')
}
testLogin()