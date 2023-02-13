import { handleUncaughtError } from "../../helpers/errorHandlers";
import controllers from "../controllers";
const { segmentController } = controllers;
export default {
  Query: {},
  Mutation: {},
  Segment:{
    persons: handleUncaughtError(segmentController.getPersons),
  },
  SEGMENT_NAMES: {
    lead: "lead",
    customer: "customer",
    prospect: "prospect",
  },
};
