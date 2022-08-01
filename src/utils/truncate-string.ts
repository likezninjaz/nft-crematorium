export const truncateString = (input: string, limit: number) =>
  input?.length > limit ? `${input.substring(0, limit)}...` : input;
