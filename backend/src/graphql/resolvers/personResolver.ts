import controller from "../controllers";
import { handleUncaughtError } from "../../helpers/errorHandlers";
const { personController, segmentController } = controller;

export default {
  Query: {
    persons: handleUncaughtError(personController.getPersons),
  },
  Mutation: {
    createPerson: handleUncaughtError(personController.createPerson),
    deletePerson: handleUncaughtError(personController.deletePerson),
    updatePerson: handleUncaughtError(personController.updatePerson),
  },

  // TODO: add dataLoader here to avoid N+1 problem
  Person: {
    segment: handleUncaughtError(segmentController.getSegmentBySegmentId),
  },

  PersonsQueryResponse: {
    __resolveType(obj: any) {
      if (obj.persons) {
        return "ListOfPersons";
      }
      if (obj.message) {
        return "Response";
      }
      return null;
    },
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
