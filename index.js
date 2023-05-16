const express = require("express");
const app = express();
const { connection } = require("./db");
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { boardRouter } = require("./routes/board.routes");

app.use(express.json());
app.use(cors());

app.use("/", userRouter);
app.use("/board", boardRouter);

app.listen(4040, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
  }
  console.log("Server is running on port 4040");
});
