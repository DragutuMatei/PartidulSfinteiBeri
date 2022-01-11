import { MyContext } from 'src/types';
import { Tasks } from "../entities/Tasks";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class TaskInput {
    @Field()
    task: string;

    @Field()
    userId: number;

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
        const tasks = await Tasks.find();

        let ts = [] as Tasks[];

        console.log(req.session.userId);
        tasks.forEach(task => {
            if (task.sefId == req.session.userId) {
                ts.push(task);
            }
            else if (task.userId == req.session.userId) {
                ts.push(task);
            }
        });

        return ts;

        // return await Tasks.find({ where: { proiectId } });
    }

}