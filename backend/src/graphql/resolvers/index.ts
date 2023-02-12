import merge from "lodash/merge";
import personResolver from "./personResolver";
import postResolver from "./postResolver";
import segmentResolver from "./segmentResolver";
const gradphqlResolvers = merge(
  {},
  personResolver,
  postResolver,
  segmentResolver
);

export default gradphqlResolvers;
