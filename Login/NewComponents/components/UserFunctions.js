import axios from 'axios'

export const register = newUser => {
    return axios.post('users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            student_id:newUser.student_id,
            email: newUser.email,
            password: newUser.password
        }).then(res => {
            console.log('Registered!')
        })
}

export const login = user => {
    return axios.post('users/login', {
            email: user.email,
            password: user.password
        }).then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        }).catch(err => {
            console.log(err)
        })
}

//export const request = newReq => {
//    return axios.post('users/requestor', {
//            name: newReq.name,
//            required_doc: newReq.required_doc
//            
//        }).then(res => {
//            console.log('Done!')
//        })
//}