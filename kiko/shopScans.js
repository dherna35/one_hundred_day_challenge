// Total # of Interactions (subtract test numbers, # of scans, basically)
// Breakdown of Visits (Top 3 Visited Locations & # of Check-Ins)
// Bonus Carats Rewarded (Social Media + Profile Interactions)
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const event = process.env.EVENT;
const token = process.env.TOKEN;

const ShopScans = async () => {
  try {
    const resQr = await axios.get(`https://geospree-services-stage.herokuapp.com/api/qrcode`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const codes = resQr.data.data.filter((code) => code.spree === event);

    const arr = [];
    const count = {};

    for (let i = 0; i < codes.length; i++) {
      let code = {};
      let qr = codes[i];
      code["spree"] = qr.spree;
      code["shopName"] = qr.shopName ? qr.shopName : "Initial Token";
      code["shop"] = qr.shop;
      code["user"] = qr.userRedeemed;
      arr.push(code);
    }

    arr.forEach((element) => {
      count[element.shopName] = (count[element.shopName] || 0) + 1;
    });

    const arranged = Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .map((x) => ({
        name: x[0],
        value: x[1],
      }));

    fs.writeFile("shopScans.json", JSON.stringify(arranged), (err) => {
      if (err) throw err;
      console.log("complete");
    });
  } catch (err) {
    console.log(err);
  }
};

ShopScans();
