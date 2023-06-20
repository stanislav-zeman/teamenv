import read from "@/repositories/project/read";
import {create} from "@/repositories/project/create";
import {remove} from "@/repositories/project/delete";
import {update} from "@/repositories/project/update";

const repository ={
  read,
  create,
  remove,
  update,
};

export default repository;
