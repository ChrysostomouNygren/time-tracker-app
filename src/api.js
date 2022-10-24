import axios from "axios";

export const getTasks = async() => {
    const res = await axios({
        method: 'get',
        url: 'http://localhost:3000/tasks'
    })
    // console.log(res)
    return res.data;
}