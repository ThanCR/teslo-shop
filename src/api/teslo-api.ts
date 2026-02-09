import axios from 'axios';


const testloApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


testloApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if( token ){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export { testloApi };


