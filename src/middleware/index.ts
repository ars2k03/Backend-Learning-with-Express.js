import express, { type NextFunction, type Request, type Response } from "express";
import fs from "fs";

export function logUse (filename : string){
    return (req : Request, res : Response, next : NextFunction) => {
        if(req.url === '/favicon.ico'){
            return next();
        }
        
        const data = `${new Date()} : ${req.method}\n`;
        
        fs.appendFile(filename, data, (error) => {
            if(error){
                return res.status(404).send('404 Not Found');
            }
            next();
        })
    }
} 