import {z} from "zod";

const zodRoleObject = z.union([
  z.literal('OWNER'),
  z.literal('MAINTAINER'),
  z.literal('DEVELOPER'),
  z.literal('GUEST'),
]).optional();

const zodEnvironment = z.union([
    z.literal('DEVELOPMENT'),
    z.literal('PRODUCTION'),
    z.literal('PREVIEW'),
    z.literal('STAGING'),
  ]
);

const zodEnvironmentObject = z.object({
  environment: zodEnvironment
});

const zodAPiKeyObject = z.object({
  apiKey: z.string(),
});

const validation = {
  role: zodRoleObject,
  environment: zodEnvironment,
  environmentObject: zodEnvironmentObject,
  apiKey: zodAPiKeyObject
}
export default validation;
