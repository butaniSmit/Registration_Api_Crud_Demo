import axios from "axios";

export async function AxiosRequest(url, method, headers, params) {

    return params ? axios({
        url: url,
        method: method,
        headers: headers,
        data: params
    }) :
        axios({
            url: url,
            method: method,
            headers: headers,
            data: {}
        })
}


export const PostApiDetails = (data) => {
    const headers = {
        "Content-Type": "multipart/form-data"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users`, "POST", headers, data);
}

export const GetDetailsById = (id) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, "GET", headers, {})
}

export const DeleteApiDetails = (id) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, "DELETE", headers, {})
}

export const UpdateApiDetails = (data,id) => {
    const headers = {
        "Content-Type": "multipart/form-data"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, "PATCH", headers, data)
}


export const Api = (apiname,recordsPerPage,page,column,order,filterinput) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}?limit=${recordsPerPage}&page=${page}&sort=${column}&orderby=${order}&name=${filterinput}`, "GET", headers, {})
}