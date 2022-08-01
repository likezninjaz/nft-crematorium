export const truncateHash = (hash: string) =>
  `${hash.substr(0, 6)}...${hash.substr(hash.length - 6, hash.length - 1)}`;
