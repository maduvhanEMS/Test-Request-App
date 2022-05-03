const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();
const mailRouter = require("./email/fastMail");
const { errorHandler } = require("./middleware/errorMiddleware");
const fs = require("fs");

const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// PDF path

app.use((req, res, next) => {
  res.append("Access-Control-Expose-Headers", "Content-Range");
  next();
});

app.use("/api", routes);
app.use("/api", require("./routes/testRequestRoutes"));
app.use("/api", require("./controllers/UploadFile"));
app.use("/api", require("./routes/developmentRoute"));
app.use("/api", require("./routes/productRoutes"));
app.use("/api", require("./routes/testInformationRoutes"));
app.use("/api", require("./routes/CCTestInformationRoutes"));
app.use("/api", mailRouter);
app.get("/public", async (req, res) => {
  try {
    const file = await fs.createReadStream(`./public/${req.query.id}`);
    file.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not Found" });
  }
});

app.use(errorHandler);

//server Connection
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server is running at LocalHost ${PORT}`));
