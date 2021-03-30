require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/admin.routes.js");
const adminRoutes = require("./routes/auth.admin.routes.js");
const bidRoutes = require("./routes/bid-routes.js");
const usersRoutes = require("./routes/users.routes.js");
const usersSignupRoutes = require("./routes/auth.users.routes.js");
const artistAuthRoutes = require("./routes/auth.artists.routes.js");
const artistRoutes = require("./routes/artists.routes");
const artworkRouter = require("./routes/artwork-routes");
const auctionsRouter =require("./routes/auctions.routes")
const likesRouter =require("./routes/routes.likes")
const verifyRouter=require("./routes/auth.verify.routes")
const app = express();
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
morgan(":method :url :status :res[content-length] - :response-time ms");
app.use("/api/auth/admin", adminRoutes);
app.use("/api/categories", router);
app.use("/api/artworks", artworkRouter);

app.use("/api/auth/users", usersSignupRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/bid", bidRoutes);
app.use("/api/auth/artists", artistAuthRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/auctions",auctionsRouter)
app.use("/api/auth",verifyRouter)
app.use("/api/likes",likesRouter)




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

// const stripe = require('stripe')('sk_test_51ISo8BBdTsia79TvAqLvTk18vcwIA3IqgP1L0ovVH3wqR1zUbjLaEpI8avUH1PdRxNObvtXHqF1Sh1oN5gEBjDIk00HgympT1p');

// const paymentIntent = await stripe.paymentIntents.create({
//   amount: 2000,
//   currency: 'usd',
//   payment_method_types: ['card'],
// });
io.on('connection', function(client) {
  console.log('Client connected...');
  client.on('join', function(data) {
     console.log(data);
     client.emit('messages', 'Hello from server');
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});
