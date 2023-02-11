import { createPerson } from "../controllers/personController";
import controller from "../controllers";
import { handleUncaughtError } from "../../helpers/errorHandlers";
const { personController } = controller;

export default {
  Query: {
    hello: () => "Hello, world!",
  },
  Mutation: {
    createPerson: handleUncaughtError(personController.createPerson),
    deletePerson: handleUncaughtError(personController.deletePerson),
    updatePerson: handleUncaughtError(personController.updatePerson),
  },
  PersonResponse: {
    __resolveType(obj: any) {
      if (obj.id) {
        return "Person";
      }
      if (obj.message) {
        return "Response";
      }
      return null;
    },
  },
};
