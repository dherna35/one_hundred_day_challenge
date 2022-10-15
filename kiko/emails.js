const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const event = process.env.EVENT;
const token = process.env.TOKEN;

async function GetEmail() {
  try {
    const res = await axios.get(`https://geospree-services-stage.herokuapp.com/api/user/spree/${event}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users = res.data.data;
    const arr = [];

    for (let i = 0; i < users.length; i++) {
      let user = {};
      user["name"] = users[i].firstName;
      user["email"] = users[i].email;
      arr.push(user);
    }
    fs.writeFile("emailExports.json", JSON.stringify(arr), (err) => {
      if (err) throw err;
      console.log("complete");
    });
  } catch (err) {
    console.log(err);
  }
}

GetEmail();
