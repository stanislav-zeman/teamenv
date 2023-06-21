import read from "@/repositories/user/read";
import create from "@/repositories/user/create";
import update from "@/repositories/user/update";
import remove from "@/repositories/user/delete";

const repository = {
  read,
  create,
  remove,
  update,
};

export default repository;