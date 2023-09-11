import { graphql, GraphQLSchema } from 'graphql';
import { buildSchema } from "type-graphql";
import { StudyResolver, UserResolver, StudyTagResolver } from '../../resolvers'

type Maybe<T> = null | undefined | T;

type options = {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: number;
}

let schema: GraphQLSchema;
export const graphCall = async ({ source, variableValues, userId }: options) => {
  if (!schema) {
    schema = await buildSchema({
      resolvers: [StudyResolver, UserResolver, StudyTagResolver],
      validate: false,
    });
  }

  return graphql({
    schema,
    source,
    variableValues
  })


}