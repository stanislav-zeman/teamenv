import { BaseModel } from "./BaseModel";

export interface Variable extends BaseModel {
    name: string;
    checked: boolean;
    value: string;
}