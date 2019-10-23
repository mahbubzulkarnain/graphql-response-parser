export default (e: any) => new Error(
  e.response
    ? (
      e.response.data.error
        ? e.response.data.error.message || e.response.data.error
        : e.response.data.message || e.response.data
    )
    : e.message || e,
);
