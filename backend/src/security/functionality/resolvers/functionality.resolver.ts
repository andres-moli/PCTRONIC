import { Query, Resolver } from "@nestjs/graphql";
import { FunctionalityKeys as FunctionalityAllKeys } from './../../../app.functionalities'
import { FunctionalityModel } from "../../models/functionality.model";
import { AdminOnly } from "../../auth/decorators/user-types.decorator";

@Resolver(() => FunctionalityModel)
export class FunctionalityResolver {

  @Query(() => FunctionalityModel, {name: "functionalities"})
  @AdminOnly()
  functionalities(): FunctionalityModel {
    return FunctionalityAllKeys;
  }
}
