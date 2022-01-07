import { Request, Response } from "express";
import { isValidObjectId, Model } from "mongoose";
import TodoModel from "../models/todo.model";
import { TODO, TODO_BODY } from "../services/service";

export class Todo {
  // ================= Task Controller =================
  public static async getTask(req: Request, res: Response) {
    try {
      const token: string = req.params.token;

      if (!isValidObjectId(token)) return res.status(404).json({msg:'Something wrong'})

      const todo = TodoModel.getTaskModel(token);

      await todo.updateMany({"deedLine":{$lt: new Date()}, status:'doing'},{status:'done'}, {new:true})
      
      const task = await todo.find({}).sort({_id:-1});
      if(!task) return res.status(404).json({msg:'Not found any task!!!'});
      res.status(200).json({ succuss: true, task });
    } catch (error) {
      console.log(error)
      res.status(404).json({msg:'Something wrong.',error });
    }
  }

  public static async createTask(req: Request, res: Response) {
    try {
      const data = req.body as TODO_BODY;

      if (!isValidObjectId(data.token)) return res.status(404).json({msg:'Something wrong'})

      const todo = TodoModel.getTaskModel(`${data.token}`);

      const task = await todo.create({...data, successDate:data.deedLine});
      res.status(200).json({ succuss: true, task });
    } catch (error) {
      res.status(404).json({msg:'Something wrong', succuss: false, error });
    }
  }

  public static async updateTask(req: Request, res: Response) {
    try {
      const data: TODO_BODY = req.body;

      if (!isValidObjectId(data.token)) return res.status(404).json({msg:'Something wrong'})

      const todo = TodoModel.getTaskModel(data.token);
      const doc = await todo.findOneAndUpdate(
        { _id: data.task_id },
        { status: "done" },
        { new: true }
      );
      res.status(200).json({ succuss: true, data: doc });
    } catch (error) {
      res.status(404).json({msg:'Something wrong', succuss: false, error });
    }
  }

  public static async editTask(req: Request, res: Response) {
    try {
      const data: TODO_BODY = req.body;

      if (!isValidObjectId(data.token)) return res.status(404).json({msg:'Something wrong'})

      const todo = TodoModel.getTaskModel(data.token);

      const task = await todo.findOneAndUpdate(
        { _id: data.task_id },
        {$set:{task:data.task, description:data.description, deedLine:data.deedLine}},
        { new: true }
      );
      if(!task) return res.status(404).json({msg:'Something wrong'});
      res.status(200).json({ succuss: true, task });
    } catch (error) {
      res.status(404).json({msg:'Something wrong', succuss: false, error });
    }
  }

  public static async confirmTask(req: Request, res: Response) {
    try {
      const data: TODO_BODY = req.body;

      if (!isValidObjectId(data.token)) return res.status(404).json({msg:'Something wrong'})

      const todo = TodoModel.getTaskModel(data.token);
      const task = await todo.findOneAndUpdate(
        { _id: data.task_id },
        { status: "done", successDate: Date.now() },
        { new: true }
      );
      res.status(200).json({ succuss: true, task});
    } catch (error) {
      res.status(404).json({msg:'Something wrong', succuss: false, error });
    }
  }

  public static async deleteTask(req: Request, res: Response) {
    try {
      const data: TODO_BODY = req.body;

      if (!isValidObjectId(data.token)) return res.status(404).json({msg:'Something wrong'})

      const todo = TodoModel.getTaskModel(data.token);
      const doc = await todo.findOneAndRemove({ _id: data.task_id });

      const sub = TodoModel.getSubModel(data.task_id)

      sub.collection.drop()

      res.status(200).json({ succuss: true});
    } catch (error) {
      res.status(404).json({msg:'Something wrong', succuss: false, error });
    }
  }

  // =============== SubTask Controller ============
  public static async getSubTask(req: Request, res: Response) {
    try {
      const _id: string = req.params.sub_id;

      if (!isValidObjectId(_id)) return res.status(404).json({msg:'Something wrong'})


      const todo = TodoModel.getSubModel(_id);

      await todo.updateMany({"deedLine":{$lt: new Date()}, status:'doing'},{status:'done'}, {new:true})

      const sub_task = await todo.find({});
      if(!sub_task) return res.status(404).json({msg:'Have not subtask.'});
      res.status(200).json({ succuss: true, sub_task});
    } catch (error) {
      res.status(404).json({msg:'Something wrong', succuss: false, error });
    }
  }

  public static async addSubTask(req: Request, res: Response) {
    try {
      const data = req.body as TODO_BODY;

      if (!isValidObjectId(data.task_id)) return res.status(404).json({msg:'Something wrong'})

      const todo: Model<TODO> = TodoModel.getSubModel(`${data.task_id}`);
      const sub_task = await todo.create({...data, successDate: data.successDate});
      res.status(200).json({ succuss: true, sub_task });
    } catch (error) {
      res.status(404).json({msg:'Something wrong', succuss: false, error });
    }
  }

  public static async editSubTask(req: Request, res: Response) {
    try {
      const data: TODO_BODY = req.body;
      const todo = TodoModel.getSubModel(data.task_id);
      
      if (!isValidObjectId(data.task_id)) return res.status(404).json({msg:'Something wrong'})

      const sub_task = await todo.findOneAndUpdate(
        { _id: data.sub_task_id },
        {$set:{task: data.task, description: data.description}},
        { new: true }
      );
      res.status(200).json({ succuss: true, sub_task });
    } catch (error) {
      res.status(404).json({msg:'Something wrong', succuss: false, error });
    }
  }

  public static async confirmSubTask(req: Request, res: Response) {
    try {
      const data: TODO_BODY = req.body;

      if (!isValidObjectId(data.task_id)) return res.status(404).json({msg:'Something wrong'})

      const todo = TodoModel.getSubModel(data.task_id);
      const sub_task = await todo.findOneAndUpdate(
        { _id: data.sub_task_id },
        { status: "done", successDate: Date.now() },
        { new: true }
      );
      res.status(200).json({ succuss: true, sub_task });
    } catch (error) {
      res.status(404).json({msg:'Something wrong', succuss: false, error });
    }
  }

  public static async deleteSubTask(req: Request, res: Response) {
    try {
      const data: TODO_BODY = req.body;

      if (!isValidObjectId(data.task_id)) return res.status(404).json({msg:'Something wrong'})

      const todo = TodoModel.getSubModel(data.task_id);
      const doc = await todo.findOneAndRemove({ _id: data.sub_task_id });
      res.status(200).json({ succuss: true});
    } catch (error) {
      res.status(404).json({msg:'Something wrong', succuss: false, error });
    }
  }
}

// public static async SubTask(req: Request, res: Response) {
//   try {
//     const data = req.body
//     const todo: Model<TODO> = TodoModel.getTaskModel(`${data.token}`);
//     // todo.subTask.push();
//     const doc = await todo.findOneAndUpdate(
//       {
//         _id: data._id,
//         subTask: {
//           $elemMatch: {
//             _id: data.sub_id,
//           },
//         },
//       },
//       {
//           $push: {
//             "subTask.$.subTask": data.subTask,
//           },
//       },
//       { new: true }
//     );

//     res.status(200).json({ succuss: true, doc });
//   } catch (error) {
//           res.status(404).json({ succuss: false, error});

//   }
// }
