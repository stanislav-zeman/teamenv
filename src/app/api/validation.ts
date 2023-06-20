import {z} from "zod";

const zodRoleObject = z.union([
  z.literal('OWNER'),
  z.literal('MAINTAINER'),
  z.literal('DEVELOPER'),
  z.literal('GUEST'),
]);

const validation = {
  role: zodRoleObject,
}
export default validation;