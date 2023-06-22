import {z} from "zod";

const zodRoleObject = z.union([
  z.literal('OWNER'),
  z.literal('MAINTAINER'),
  z.literal('DEVELOPER'),
  z.literal('GUEST'),
]);

const zodEnvironmentObject = z.union([
  z.literal('DEVELOPMENT'),
  z.literal('PRODUCTION'),
  z.literal('PREVIEW'),
  z.literal('STAGING'),
]);

const validation = {
  role: zodRoleObject,
  environment: zodEnvironmentObject,
}
export default validation;