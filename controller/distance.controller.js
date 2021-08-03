var axios = require("axios");
exports.calculate = async (req, res) => {
  const key = process.env.API_KEY;
  const origin = req.body.origin;
  const arraydest = req.body.destinations;
  if (arraydest.length > 25) {
    return res.status(400).json({ msg: "Límite de destinos superado" });
  }
  var destinations = "";
  arraydest.forEach((d) => {
    destinations = destinations + d.gps + "|";
  });

  const base_url =
    "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&transit_mode=bus";
  //  origins=40.6655101,-73.89188969999998&
  //  destinations=40.6905615%2C-73.9976592
  //  %7C40.6905615%2C-73.9976592
  //  %7C40.6905615%2C-73.9976592
  //  %7C40.6905615%2C-73.9976592
  //  %7C40.6905615%2C-73.9976592
  //  %7C40.6905615%2C-73.9976592
  //  %7C40.659569%2C-73.933783
  //  %7C40.729029%2C-73.851524
  //  %7C40.6860072%2C-73.6334271
  //  %7C40.598566%2C-73.7527626
  //  %7C40.659569%2C-73.933783
  //  %7C40.729029%2C-73.851524
  //  %7C40.6860072%2C-73.6334271
  //  %7C40.598566%2C-73.7527626
  // 40.6905615%2C-73.9976592%7C40.729029%2C-73.851524%7C40.659569%2C-73.933783
  var { data } = await axios
    .get(
      `${base_url}&origins=${origin}&destinations=${destinations}&key=${key}`
    )
    .catch((err) => {
      console.log(err);
    });

  // var min = data.rows[0].elements[0].distance.value;
  // var resp;
  // data.rows[0].elements.forEach((e) => {
  //   if (e.distance.value < min) {
  //     min = e.distance.value;
  //     resp = e;
  //   }
  // });

  
  for (let i = 0; i < data.rows[0].elements.length; i++) {
    data.rows[0].elements[i].id = arraydest[i].id;
    data.destination_addresses[i]={id:arraydest[i].id, ubi: data.destination_addresses[i], gps:arraydest[i].gps};
  }
  data.rows[0].elements = data.rows[0].elements.sort(function (a, b) {
    return a.duration.value - b.duration.value;
  });
  res.status(200).json(data);
};
