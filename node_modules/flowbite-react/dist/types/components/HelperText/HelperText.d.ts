import type { ComponentProps, FC } from "react";
import type { DeepPartial, DynamicStringEnumKeysOf } from "../../types";
import type { FlowbiteColors } from "../Flowbite";
export interface FlowbiteHelperTextTheme {
    root: FlowbiteHelperTextRootTheme;
}
export interface FlowbiteHelperTextRootTheme {
    base: string;
    colors: HelperColors;
}
export interface HelperColors extends Pick<FlowbiteColors, "gray" | "info" | "failure" | "warning" | "success"> {
    [key: string]: string;
}
export interface HelperTextProps extends Omit<ComponentProps<"p">, "color"> {
    color?: DynamicStringEnumKeysOf<HelperColors>;
    theme?: DeepPartial<FlowbiteHelperTextTheme>;
    value?: string;
}
export declare const HelperText: FC<HelperTextProps>;
