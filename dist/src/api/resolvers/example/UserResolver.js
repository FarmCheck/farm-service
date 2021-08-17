"use strict";
// import { FieldResolver, Query, Resolver, Root } from "type-graphql";
// import { Service } from "typedi";
// import { User as UserModel } from "../models/entities/User";
// import { PetService } from "../services/cruds/FarmPaymentService";
// import { UserService } from "../services/cruds/UserService";
// import { User } from "../types/User";
// @Service()
// @Resolver((of) => User)
// export class UserResolver {
//     constructor(
//         private userService: UserService,
//         private petService: PetService
//     ) {}
//     @Query((returns) => [User])
//     public users(): Promise<any> {
//         return this.userService.find();
//     }
//     @FieldResolver()
//     public async pets(@Root() user: UserModel): Promise<any> {
//         return this.petService.findByUser(user);
//     }
// }
//# sourceMappingURL=UserResolver.js.map