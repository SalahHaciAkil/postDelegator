import { useMutation } from "@apollo/client";
import { SchedulePostToSegmentsMutation } from "../graphql/mutations/SchedulePostToSegments";

function useSchedulePostToSegments() {
  const [mutate, { loading, error }] = useMutation(
    SchedulePostToSegmentsMutation
  );

  return {
    schedulePost: async ({ id, segmentNames }) => {
      // TODO: replace alert with a better UI
      const {
        data: { result },
      } = await mutate({
        variables: { id, segmentNames },
      });
      if (result.message) alert(result.message);
      if (result.id) alert("post scheduled successfully");

      return result;
    },
    loading,
    error: Boolean(error),
  };
}

export default useSchedulePostToSegments;
