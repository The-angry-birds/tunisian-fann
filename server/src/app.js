require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;
const path = require("path");
const axios = require("axios");
const app = express();

const cors = require("cors");
// const morgan = require("morgan");
const router = require("./routes/admin.routes.js");
const adminRoutes = require("./routes/auth.admin.routes.js");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const bidRoutes = require("./routes/bid-routes");
const bidauction = require("./routes/auction-bid.routes.js");
const usersRoutes = require("./routes/users.routes.js");
const usersSignupRoutes = require("./routes/auth.users.routes.js");
const artistAuthRoutes = require("./routes/auth.artists.routes.js");
const artistRoutes = require("./routes/artists.routes");
const artworkRouter = require("./routes/artwork-routes");
const auctionsRouter = require("./routes/auctions.routes");
const likesRouter = require("./routes/routes.likes");
const verifyRouter = require("./routes/auth.verify.routes");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
// const { QueryTypes } = require("sequelize");
// const Sequelize = require("sequelize");
// const { sequelize } = require("../db/index");
// app.use(morgan("combined"));
app.use(cors());
// app.get("/iness", async (req, res) => {
//   try {
//     var query = `select * from artworks, artists, categories where artworks.id=1 and artists.id=artworks.artist_id and categories.id=artworks.category_id;`;
//     const users = await sequelize.query(query, { type: QueryTypes.SELECT });
//     console.log(users);
//     res.send(users);
//   } catch (err) {
//     res.send(err);
//   }
// });
// morgan(":method :url :status :res[content-length] - :response-time ms");
app.use("/api/auth/admin", adminRoutes);
app.use("/api/categories", router);
app.use("/api/artworks", artworkRouter);
app.use("/api/auctionbid", bidauction);
app.use("/api/auth/users", usersSignupRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/bid", bidRoutes);
app.use("/api/auth/artists", artistAuthRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/auctions", auctionsRouter);
app.use("/api/auth", verifyRouter);
app.use("/api/likes", likesRouter);

// app.post("/sendmessage", (req, res) => {
//   console.log(req.body);

//   const accountSid = process.env.TWILIO_ACCOUNT_SID;
//   const authToken = process.env.TWILIO_AUTH_TOKEN;
//   const client = require("twilio")(accountSid, authToken);

//   client.messages
//     .create({
//       body: "Welcome to our platforme",
//       from: "+15034063023",
//       to: "+21622292162",
//     })
//     .then((message) => res.send(message));
// });
app.post("/payments/init-payment", async (req, res) => {
  let data;
  try {
    const body = {
      receiverWallet: "6064c507c7e3ca6b3c9fa685",
      amount: req.body.amount * 1000,
      entMetho: "gateway",
      token: "TND",
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      orderId: "12233555",
      webhook: "merchant.tech/api/notification_payment",
      successUrl: "success@merchant.tech",
      failUrl: "fail@merchant.tech",
    };
    console.log(body);
    await axios
      .post(
        "https://api.preprod.konnect.network/api/v1/payments/init-payment",
        body
      )
      .then((res) => {
        console.log(res.data);
        data = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

io.on("connection", function (client) {
  console.log("Client connected...");
  client.on("join", function (data) {
    console.log(data);
    client.emit("messages", "Hello from server");
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});
