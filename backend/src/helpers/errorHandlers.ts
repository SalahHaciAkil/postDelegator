import { STATUS_CODES } from "./constants";

const genericError = {
  message: "An error occurred. Please try again.",
  status: STATUS_CODES.INTERNAL_SERVER_ERROR,
  success: false,
};

const raiseError = (error) => ({
  __typename: "Response",
  success: false,
  ...error,
});

// Handle uncaught errors by wrapping callbacks that might bring unexpected results
const handleUncaughtError = (resolve: any) => async (parent, args, context) => {
  try {
    return await resolve(parent, args, context);
  } catch (error) {
    console.log("error message: ", error.message);

    return raiseError(genericError);
  }
};

export { raiseError, genericError, handleUncaughtError };
