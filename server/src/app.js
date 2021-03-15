const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const Router = require("./routes/admin.routes.js");
const adminRoutes = require("./routes/admin-auth.routes.js");
const usersRoutes = require("./routes/users.routes.js");
const artistAuthRoutes = require("./routes/artist-auth-routes.js");
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", adminRoutes);
app.use("/categorys", Router);
app.use("/users", usersRoutes);
app.use("/artist/auth", artistAuthRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});
