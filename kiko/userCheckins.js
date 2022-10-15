const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const event = process.env.EVENT;
const token = process.env.TOKEN;

const UserCheckIns = async () => {
  try {
    const resQr = await axios.get(`https://geospree-services-stage.herokuapp.com/api/qrcode`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resUser = await axios.get(`https://geospree-services-stage.herokuapp.com/api/user/spree/${event}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const codes = resQr.data.data.filter((code) => code.spree === event);
    const users = resUser.data.data;

    const arr = [];
    const info = [];

    for (let i = 0; i < codes.length; i++) {
      let code = {};
      let qr = codes[i];
      code["shopName"] = qr.shopName ? qr.shopName : "Signup / Bonus Carat";
      code["user"] = qr.userRedeemed;
      arr.push(code);
    }

    for (let i = 0; i < users.length; i++) {
      let user = {};
      let y = users[i];
      const scans = arr.filter((c) => c.user === y.id);
      user["name"] = y.firstName;
      user["email"] = y.email;
      user["totalScans"] = scans.length;
      user["scans"] = scans;
      info.push(user);
    }

    fs.writeFile("userCheckins.json", JSON.stringify(info), (err) => {
      if (err) throw err;
      console.log("complete");
    });
  } catch (err) {
    console.log(err);
  }
};

UserCheckIns();
