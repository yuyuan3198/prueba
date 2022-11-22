import  express  from "express";
import morgan from "morgan";
import {Server as socket} from "socket.io";
import http from "http";
import cors from 'cors';
import { PORT } from "./config.js";

const app = express()
const server = http.createServer(app);
const io = new socket(server,{
    cors : {
        origin : '*',
    }
});

app.use(cors())
app.use(morgan("dev"));


io.on('connection',(socket)=>{
   

   console.log("alguien se conecto");
   console.log(socket.id);
   
   socket.on('conectado',()=>{
       
        socket.broadcast.emit('mensajes',{ mensaje: `Alguien ha entrado al chat`})
   })
    
    socket.on('mensaje',(nombre,mensaje)=>{
        io.emit("mensajes",{nombre,mensaje});
        console.log(nombre,mensaje);
    })

    socket.on('disconnect',()=>{
        console.log("alguien se desconecto");
        io.emit("mensajes",{servidor : "servidor", mensaje:`Alguien ha abandonado la sala`})
    })
})

server.listen(PORT)
console.log("server en puerto " + PORT);
