import axios from "axios";

export const myAxios = axios.create({
    baseURL : "https://pre-onboarding-selection-task.shop",
    // baseURL : "http://localhost:8000",
    headers:{
        "Content-Type" : "application/json",
    }
});


