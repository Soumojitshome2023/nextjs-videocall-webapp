import type { ComponentProps, ReactNode } from "react";
import type { DeepPartial, DynamicStringEnumKeysOf } from "../../types";
import type { FlowbiteTextInputColors, FlowbiteTextInputSizes } from "../TextInput";
export interface FlowbiteFileInputTheme {
    root: FlowbiteFileInputRootTheme;
    field: FlowbiteFileInputFieldTheme;
}
export interface FlowbiteFileInputRootTheme {
    base: string;
}
export interface FlowbiteFileInputFieldTheme {
    base: string;
    input: FlowbiteFileInputFieldInputTheme;
}
export interface FlowbiteFileInputFieldInputTheme {
    base: string;
    colors: FlowbiteTextInputColors;
    sizes: FlowbiteTextInputSizes;
}
export interface FileInputProps extends Omit<ComponentProps<"input">, "type" | "ref" | "color"> {
    color?: DynamicStringEnumKeysOf<FlowbiteTextInputColors>;
    helperText?: ReactNode;
    sizing?: DynamicStringEnumKeysOf<FlowbiteTextInputSizes>;
    theme?: DeepPartial<FlowbiteFileInputTheme>;
}
export declare const FileInput: import("react").ForwardRefExoticComponent<FileInputProps & import("react").RefAttributes<HTMLInputElement>>;
