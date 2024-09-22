import mongoose from "mongoose";
import { server } from "./app.js";
import { Server, Socket } from "socket.io";
import 'dotenv/config'
const db = process.env.DATABASE_URL;
const PORT = process.env.PORT||8000 ;
const io = new Server(server,{
    cros:{
        origin: "*",
    }
 })
 const message = io.of("/cannect-message")
io.on("connection",(socket)=>{
  console.log(`connected ${socket.rooms}`)
})
message.on('connection', (socket)=>{
  console.log(`connected 2 ${socket.rooms}`)
})
server.listen(PORT,"0.0.0.0", () => {
  console.log(`Server started on port:${PORT}`);
});
mongoose.connect(db).then(() => {
  console.log("Database is connected");
});

export{message}









