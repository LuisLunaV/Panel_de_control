import express, { Request } from 'express';
import {  authRouter, homeRouter } from '../routes/index.routes';
import { dbConnection } from '../database/config.db';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { CLIENT_BASE_URL } from '../config/envs'

export class Server{
    private readonly app = express();
    private readonly port:number;
    private pathsWeb = {
        auth: '/auth',
        panel: '/panel'
    }
   
    constructor( port:number ){
        this.port = port;
        this.connectDB();
    }

     private async connectDB(){
                await dbConnection();
    } 

    
    public start(){

    //Middleware
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors<Request>({
        origin: [CLIENT_BASE_URL as string || 'http://localhost:5173'], // Allow requests only from these origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Allow cookies, if your application uses them
        optionsSuccessStatus: 200, 
    }));

    // Usar las rutas definidas    
    this.app.use( this.pathsWeb.auth, authRouter);
    this.app.use( this.pathsWeb.panel, homeRouter);
    
    this.app.listen(this.port,()=>{
        console.log(`Servidor levantado en puerto: ${this.port}`)
    });
   }
}