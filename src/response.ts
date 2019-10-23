interface IPageInfo {
  nextCursor: string | null;
  prevCursor: string | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface IResponse {
  edges: any;
  message: string;
  pageInfo: IPageInfo;
  totalCount?: number;
}

export default (arg: any, options = { status: "", message: "", totalCount: 0, limit: 10, offset: 0 }): IResponse => {
  const data = (arg.data ? (arg.data.data ? arg.data.data : arg.data) : arg);
  const edges = data.edges || data;
  const statusCode = +options.status || +data.status || +data.statusCode || 200;
  const total = (+options.totalCount) || +(edges instanceof Array || edges instanceof String ? edges.length : 0)
    || (edges instanceof Object ? Object.keys(edges).length : 0);
  const totalPage = Math.ceil(total / options.limit) || 1;
  const current = Math.ceil(options.offset / options.limit) + 1;
  const hasNextPage = current < totalPage;
  const hasPrevPage = current > 1;
  return {
    edges,
    message   : options.message || data.message || +statusCode < 400 ? "success" : "Internal Server Error",
    pageInfo  : data.pageInfo || {
      hasNextPage,
      hasPrevPage,
      nextCursor: hasNextPage ? current + 1 + "" : "",
      prevCursor: hasPrevPage ? current - 1 + "" : "",
    },
    totalCount: total,
  };
};
