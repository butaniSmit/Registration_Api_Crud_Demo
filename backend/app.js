const express = require("express");
const app = express();
const cors = require("cors");
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routers/userRouter');
var morgan = require("morgan");
app.use(express.json());
const path = require('path');
if ((process.env.NODE_ENV = "development")) {
    app.use(morgan("dev"));
  }

  app.use(
    cors({
      origin: [
        "http://localhost:3001",
        "http://localhost:3000",
      ],
      methods: ["GET","POST","DELETE","PATCH"],
      allowedHeaders: ["X-Requested-With", "content-type","Authorization"],
      credentials: true,
    })
  );
  app.use(express.static(`${__dirname}`));
  app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api/users', userRouter);

app.use(globalErrorHandler);
module.exports = app;