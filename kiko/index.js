const axios = require("axios");
const fs = require("fs");

const getInfo = async () => {
  try {
    const res = await axios.get("https://www.downtownlongmont.com/_api/carat-app.json");
    const list = res.data.features;
    const arr = [];

    for (var i = 0; i < list.length; i++) {
      var shop = {};
      var info = list[i].properties;

      shop["spree"] = "62e31791d0737a001663704b";
      shop["name"] = info.point_name;
      shop["tagline"] = "";
      shop["description"] = info.point_html_desc
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/&nbsp;/g, "")
        .replace(/(\r\n|\n|\r)/gm, "");
      shop["logo"] = "";
      shop["featured_image"] = list[i].images.content[0].image_url;
      shop["address"] = info.point_address_line2
        ? info.point_street_number +
          " " +
          info.point_street_name +
          " " +
          info.point_address_line2 +
          ", " +
          info.point_city_state +
          " " +
          info.point_zip
        : info.point_street_number + " " + info.point_street_name + ", " + info.point_city_state + " " + info.point_zip;
      shop["phone"] = info.point_telephone;
      shop["website"] = info.point_website;
      shop["secondary_category"] = list[i].filters.groups[0].group_label;
      shop["isActive"] = true;
      shop["isAdministrator"] = false;
      shop["number_carats_checkin"] = "";
      shop["isHidden"] = false;
      shop["latitude"] = list[i].geometry.coordinates[1];
      shop["longitude"] = list[i].geometry.coordinates[0];
      shop["createdBy"] = "621bd5ec13989abc5619a456";
      shop["createdAt"] = new Date();
      shop["updatedAt"] = new Date();
      arr.push(shop);
    }

    fs.writeFile("shops.json", JSON.stringify(arr), function (err) {
      if (err) throw err;
      console.log("complete");
    });
  } catch (err) {
    console.error(err);
  }
};

getInfo();
