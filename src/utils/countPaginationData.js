export const calcPaginationData = ({ page, perPage, total }) => {
  const totalPages = Math.ceil(total / perPage);
  const hasPerPage = page > 1;
  const hasNextPage = page < totalPages;

  return {
    totalPages,
    hasPerPage,
    hasNextPage,
  };
};
