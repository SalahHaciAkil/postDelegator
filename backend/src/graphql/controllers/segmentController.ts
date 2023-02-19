export const getSegmentById = async (
  _: any,
  { id }: any,
  { segmentsLoader }
) => {
  const segment = await segmentsLoader.load(id);
  return segment;
};

export const getSegmentBySegmentId = async (parent: any, _: any, context) => {
  const { segment_id } = parent;
  return await getSegmentById(null, { id: segment_id }, context);
};

export const getPersons = async (
  parent: any,
  _: any,
  { personsBySegmentIdLoader }
) => {
  const { id } = parent;
  return await personsBySegmentIdLoader.load(id);
};
