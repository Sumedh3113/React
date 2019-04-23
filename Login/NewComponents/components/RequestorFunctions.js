import axios from 'axios'

export const req1 = newReq => {
    return axios.post('requests/req1', {
            required_doc: newReq.required_doc,
			name: newReq.name,
            student_id:newReq.student_id
        }).then(res => {
            console.log('Done!')
        })
}