import merge from "lodash/merge";
import personResolver from "./personResolver";
import postResolver from "./postResolver";
const gradphqlResolvers = merge({}, personResolver, postResolver);

export default gradphqlResolvers;
