import read from "@/repositories/user/read";
import create from "@/repositories/user/create";
import specific from "@/repositories/user/update";
import remove from "@/repositories/user/delete";

const repository = {
  read,
  create,
  remove,
  update: specific,
};

export default repository;