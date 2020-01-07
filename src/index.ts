import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import createServer from "./createServer";

const corsOptions: any = {
  cors: {
    credentials: true,
    origin: ["*"]
  }
};

// create a server
const server = createServer();

// manage cookies
server.express.use(cookieParser());

// decode the jwt to obtain the user id
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, "ke-taxi");
    // put the user onto the request for future requests to access
    req.user = (user as any).user;
  }
  next();
});

server.start();
