import { Sedinte } from '../entities/Sedinte';
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, } from "type-graphql";
import { MyContext } from 'src/types';

@InputType()
class SedintaInput {
    @Field()
    topic: string;

    @Field()
    data: string;

    @Field()
    proiectId: string;

    @Field()
    userId: number;
}

@Resolver()
export class SedinteResolver {
    @Mutation(() => Sedinte)
    async addSedinta(
        @Arg("values") values: SedintaInput
    ): Promise<Sedinte> {
        return await Sedinte.create({ ...values }).save();
    }

    @Query(() => [Sedinte])
    async getSedinte(
        @Ctx() { req }: MyContext
    ): Promise<Sedinte[]> {
        return await Sedinte.find({ userId: req.session.userId });
    }

    @Mutation(() => Boolean)
    async deleteSedinta(
        @Arg("sedintaId") sedintaId: number
    ): Promise<boolean> {
        const sedinta = await Sedinte.delete({ id: sedintaId });
        if (sedinta)
            return true
        return false;
    }
}