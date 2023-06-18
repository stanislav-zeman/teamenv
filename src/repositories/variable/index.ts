import read from "@/repositories/variable/read";
import create from "@/repositories/variable/create";
import update from "@/repositories/variable/update";
import remove from "@/repositories/variable/delete";

const repository = {
  read,
  create,
  remove,
  update,
};

export default repository;