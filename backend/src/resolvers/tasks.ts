import { Proiecte } from '../entities/Proiecte';
import { MyContext } from 'src/types';
import { Tasks } from "../entities/Tasks";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from 'typeorm';

@InputType()
class TaskInput {
    @Field()
    task: string;

    @Field()
    userId: number;

    @Field()
    userName: string;

    @Field()
    sefId: number;

    @Field()
    proiectId: number;

    @Field({ nullable: true })
    points?: number;

    @Field({ defaultValue: false })
    finish: boolean;

    @Field()
    deadline: string;
}

@Resolver()
export class TasksResolver {

    @Mutation(() => Tasks)
    async addTask(
        @Arg("values") values: TaskInput
    ): Promise<Tasks> {
        return await Tasks.create({ ...values }).save();
    }


    @Mutation(() => Boolean)
    async addPoints(
        @Arg("taskId") taskId: number,
        @Arg("points") points: number
    ): Promise<boolean> {
        console.log(taskId);
        const task = await Tasks.update({ id: taskId }, { points });
        if (task) {
            return true
        }
        return false;
    }

    @Mutation(() => Boolean)
    async finish(
        @Arg("taskId") taskId: number
    ): Promise<boolean> {
        const task = await Tasks.update({ id: taskId }, { finish: true });
        if (task)
            return true
        return false;
    }


    @Query(() => [Tasks])
    async getTasks(
        @Ctx() { req }: MyContext
    ): Promise<Tasks[]> {
        const tasks = await Tasks.find({order:{id:"DESC"}});

        let ts = [] as Tasks[];

        tasks.forEach(task => {
            if (task.sefId == req.session.userId) {
                ts.push(task);
            }
            else if (task.userId == req.session.userId) {
                ts.push(task);
            }
        });

        return ts;
    }

    @Mutation(() => Boolean)
    async deleteTask(
        @Arg("taskId") taskId: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        const task = await Tasks.findOne();
        if (task?.sefId != req.session.userId) {
            return false;
        } else {
            await Tasks.delete({ id: taskId });
            return true;
        }
    }

    // @Query(() => [Tasks])
    // async getTasks(
    //     @Ctx() { req }: MyContext
    // ): Promise<Tasks[]> {
    //     const proiecte = await Proiecte.find();

    //     const proiecteId = [] as number[];

    //     for (let i = 0; i < proiecte.length; i++) {
    //         if (proiecte[i].sefId == req.session.userId ||
    //             proiecte[i].userId.includes(req.session.userId?.toString()!)
    //         ) {
    //             proiecteId.push(proiecte[i].id);
    //         }
    //     }

    //     const tasks = [] as Tasks[];

    //     const allTasks = await Tasks.find();

    //     for (let i = 0; i < allTasks.length; i++) {
    //         if (allTasks[i].proiectId == proiecteId[i]) {
    //             tasks.push(allTasks[i]);
    //         }
    //     }

    //     return tasks;
    // }


    @Query(() => [Tasks])
    async getTaskByProiect(
        @Arg("proiectId") proiectId: number
    ): Promise<Tasks[]> {
        return await Tasks.find({ where: { proiectId: proiectId } });
    }

}