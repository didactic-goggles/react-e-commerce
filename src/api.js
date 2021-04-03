import axios from 'axios';
// import { Alert } from "rsuite";

// Alert.config({ top: 50 });

// const showError = (content) => Alert.error(content);

const defaultInstance = axios.create({
  baseURL: 'https://comfortmedikal.com/api/',
});

defaultInstance.interceptors.response.use(
  (response) => response.data,
  (err) => {
    // console.log(err.response.data.message);
    Promise.reject(err.response ? err.response.data.message : err);
  }
);

export default defaultInstance;
