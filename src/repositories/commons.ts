
type Deletable = {
  deletedAt: Date | null;
}

const isDeleted = (o: Deletable) => {
  return o.deletedAt !== null;
};
