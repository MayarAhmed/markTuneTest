import axios from 'axios'

const instance = axios.create({

    baseURL:'https://marketune-visualization-test.herokuapp.com',
    
}) 


export default instance;
