import http, { IncomingMessage, Server, ServerResponse } from "http";
import { getAllData, addData, updateData, deleteData } from "./controller"

/*
implement your server code here
*/

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url == "/data") {
      return getAllData(req, res)
    }else if(req.method === "POST" && req.url == "/addData"){
      return addData(req, res)
    }else if(req.method === "PUT" && req.url === "/updateData"){
      return updateData(req, res)
    }else if (req.method === "DELETE" && req.url === "/deleteData"){
      return deleteData(req, res)
    }
  }
);

server.listen(3005, () => console.log(`Server is listening on Port ${3005}`));