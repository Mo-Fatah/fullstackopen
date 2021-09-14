import axios from "axios";
const baseURL = '/api/persons';

const getAll = () =>{
    const request = axios.get(baseURL);
    return request.then(response =>{
        return response.data;
    })
}
const create = newObj =>{
    return axios.post(baseURL , newObj)
            .then(response => {
                return response.data;
            })
}

const remove = id =>{
    console.log("clicked for phone no" + id);
    axios.delete(baseURL+'/'+id);

}
const update = newObj => {
    return axios.put(baseURL+'/'+newObj.id , newObj).then(
        response => { return response.data}
    )
}

export default {getAll ,create, remove, update}; 