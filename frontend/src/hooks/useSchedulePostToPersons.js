import { useMutation } from "@apollo/client";
import { SchedulePostToPersonsMutation } from "../graphql/mutations/SchedulePostToPersons";

function useSchedulePostToPersons() {
  const [mutate, { loading, error }] = useMutation(
    SchedulePostToPersonsMutation
  );

  return {
    schedulePost: async ({ id, personIds }) => {
      const {
        data: { result },
      } = await mutate({
        variables: { id, personIds },
      });
      if (result.message) alert(result.message);
      if (result.id) alert("post scheduled successfully");

      return result;
    },
    loading,
    error: Boolean(error),
  };
}

export default useSchedulePostToPersons;
