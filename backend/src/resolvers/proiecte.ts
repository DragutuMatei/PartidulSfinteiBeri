import { MyContext } from './../types';
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { Proiecte } from '../entities/Proiecte';

@InputType()
class ProiecteInput {
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
    // @UseMiddleware(isAuth)
    async createProiect(
        @Arg("values") values: ProiecteInput
    ): Promise<Proiecte> {
        return await Proiecte.create({
            sefId: values.sefId,
            numeleProiectului: values.numeleProiectului,
            userId: values.userId + ", "
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
    async getAllProiecte(
        @Arg("sefId") sefId: number
    ): Promise<Proiecte[]> {
        return await Proiecte.find({ where: { sefId } });
    }


    @Mutation(() => Boolean)
    async addUser(
        @Arg("idUserAdd") idUserAdd: number,
        @Arg("proiectId") proiectId: number,
    ): Promise<boolean> {
        const proiect = await Proiecte.findOne({ id: proiectId });

        console.log(proiect?.userId + idUserAdd.toString() + ", ")

        await Proiecte.update({ id: proiectId }, { userId: proiect?.userId + idUserAdd.toString() + ", " })

        return true;
    }
}