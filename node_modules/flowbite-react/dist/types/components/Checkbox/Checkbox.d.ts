import type { ComponentProps } from "react";
import type { DeepPartial, DynamicStringEnumKeysOf } from "../../types";
import type { FlowbiteColors } from "../Flowbite";
export interface FlowbiteCheckboxTheme {
    root: FlowbiteCheckboxRootTheme;
}
export interface FlowbiteCheckboxRootTheme {
    base: string;
    color: FlowbiteColors;
}
export interface CheckboxProps extends Omit<ComponentProps<"input">, "type" | "ref" | "color"> {
    theme?: DeepPartial<FlowbiteCheckboxTheme>;
    color?: DynamicStringEnumKeysOf<FlowbiteColors>;
}
export declare const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLInputElement>>;
