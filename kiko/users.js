const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const event = process.env.EVENT;
const token = process.env.TOKEN;
const stamps = 7;

async function GetUsers() {
  try {
    const res = await axios.get(`https://geospree-services-stage.herokuapp.com/api/user/spree/${event}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users = res.data.data;
    const overachievers = users.filter((user) => user.totalStamp >= stamps);
    const arr = [];

    for (let i = 0; i < overachievers.length; i++) {
      let user = {};
      let info = overachievers[i];
      user["name"] = info.firstName;
      user["email"] = info.email;
      user["Total Carats"] = info.totalStamp;
      arr.push(user);
    }
    fs.writeFile("users.json", JSON.stringify(arr), (err) => {
      if (err) throw err;
      console.log("complete");
    });
  } catch (err) {
    console.log(err);
  }
}

GetUsers();
