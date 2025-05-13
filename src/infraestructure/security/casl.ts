import { AbilityBuilder, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility } from "@casl/ability";
import { RequestUser } from "../../@types/Request";
import { User } from "../../domain/entities/user";
export enum Actions {
    Read = "read",
    Manage = "manage",
    Update = "write",
    Create = "create",
    Delete = "delete",
}
export type Subjects = InferSubjects<
    typeof User
> | "all" ;

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export class CaslFactory { 
    static defineAbilityFor (user : RequestUser){ 
        const abilityBuilder = new AbilityBuilder<AppAbility>(createMongoAbility);

        if (user.isMaster) {
            abilityBuilder.can(Actions.Manage, "all");    
        } else {
            abilityBuilder.can(Actions.Read, "all");
        }
        return abilityBuilder.build({
            detectSubjectType : (item) => item.constructor as ExtractSubjectType<Subjects>
        })
    }
}