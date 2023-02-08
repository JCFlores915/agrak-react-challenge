
import axios from "axios";


export const header = {
   "listUser": {
        title: "List User",
        buttonName:"Add User",
        linkTo:"../user"
    },
    "addUser": {
        title: "Add User",
        buttonName:"Go back",
        linkTo:"./issues/list"
    },
    "updateUser":{
        title: "Update User",
        buttonName:"Go back",
        linkTo:"./issues/list"
    }
}

export const userApi  = axios.create({
    baseURL:'https://635017b9df22c2af7b630c3e.mockapi.io/api/v1'
})


