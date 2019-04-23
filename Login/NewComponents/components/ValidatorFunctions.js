import axios from 'axios'

export const val1 = valReq => {
    return axios.post('validates/val1', {
        student_id:valReq.student_id,    
        status:valReq.status
            
        }).then(res => {
            console.log('Done!')
        })
}   