import { Sedinte } from '../entities/Sedinte';
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class SedintaInput {
    @Field()
    topic: string;

    @Field()
    data: string;

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
        @Arg("proiectId") proiectId: number
    ): Promise<Sedinte[]> {
        return await Sedinte.find({ proiectId });
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