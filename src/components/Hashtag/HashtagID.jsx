import axios from "axios";


require('dotenv').config();
const sendGetRequest = async (hashtagID) => {
    baseURL = process.env.REACT_APP_BASE_URL;
    email = process.env.REACT_APP_EMAIL;
    try {
        const resp = await axios.get(this.baseURL + "hashtag/" + hashtagID );
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

sendGetRequest();