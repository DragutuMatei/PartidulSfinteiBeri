import { isAuth } from './../middleware/isAuth';
import { MyContext } from 'src/types';
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { Proiecte } from '../entities/Proiecte';

@InputType()
export class ProiecteInput {

    @Field()
    userId: string;

    @Field()
    numeleProiectului: string;

    @Field()
    sefId: number;
}

@Resolver()
export class ProiecteResolver {

    @Mutation(() => Proiecte)
    async createProiect(
        @Arg("values") values: ProiecteInput
    ): Promise<Proiecte> {
        return await Proiecte.create({
            sefId: values.sefId,
            numeleProiectului: values.numeleProiectului,
            userId: values.userId
        }).save();
    }


    @Mutation(() => Boolean)
    async deleteProiect(
        @Arg("id") id: number
    ): Promise<boolean> {
        try {
            await Proiecte.delete(id);
        } catch {
            return false;
        }
        return true;
    }

    @Query(() => [Proiecte])
    @UseMiddleware(isAuth)
    async getAllProiecte(
        @Ctx() { req }: MyContext
    ): Promise<Proiecte[]> {
        const proiecte = await Proiecte.find({ order: { id: "DESC" } });
        let pr = [] as Proiecte[];

        proiecte.forEach(proiect => {
            if (proiect.sefId == req.session.userId)
                pr.push(proiect);
            else if (proiect.userId.includes(req.session.userId!.toString())) {
                pr.push(proiect);
            }
        });

        return pr;
    }

    @Query(() => Proiecte)
    async getAProiectById(
        @Arg("id") id: number
    ): Promise<Proiecte> {
        return await Proiecte.findOneOrFail({ id });
    }

    @Mutation(() => Boolean)
    async addUser(
        @Arg("idUserAdd") idUserAdd: number,
        @Arg("proiectId") proiectId: number,
    ): Promise<boolean> {
        const proiect = await Proiecte.findOne({ id: proiectId });

        await Proiecte.update({ id: proiectId }, { userId: proiect?.userId + idUserAdd.toString() + ", " })

        return true;
    }






}

