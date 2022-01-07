import { Request, Response } from "express";

import UserModel from "../models/user.model";
import { USER_BODY } from "../services/service";

export class User {
    public static async getUserAll(req: Request, res: Response){
        try {
            const users = await UserModel.find({})
            res.status(200).json({success:true, users})
        } catch (error) {
            res.status(400).json({success:false, error})
        }
    }
    
    public static async getUser(req: Request, res: Response){
        try {
            const name: string = req.params.name;
            const user = await UserModel.findOne({username:name})
            if (!user) return res.status(400).json({msg:"User does not exist."})
            res.status(200).json({success:true, user})
        } catch (error) {
            res.json({success:false, error})
        }
    }

    public static async createUser(req: Request, res: Response){
        try {
            const data: USER_BODY = req.body;
            const existUser = await UserModel.findOne({username:data.username})
            if(existUser) return res.status(400).json({msg:"User alreading exist. Please Login"})
            const user = await UserModel.create(data)
            res.status(200).json({success:true, user})
        } catch (error) {
            res.status(400).json({success:false, error})
        }
    }
}
