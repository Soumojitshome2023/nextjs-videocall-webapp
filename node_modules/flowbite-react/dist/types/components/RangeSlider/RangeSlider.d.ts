import type { ComponentProps } from "react";
import type { DeepPartial, DynamicStringEnumKeysOf } from "../../types";
import type { FlowbiteTextInputSizes } from "../TextInput";
export interface FlowbiteRangeSliderTheme {
    root: FlowbiteRangeSliderRootTheme;
    field: FlowbiteRangeSliderFieldTheme;
}
export interface FlowbiteRangeSliderRootTheme {
    base: string;
}
export interface FlowbiteRangeSliderFieldTheme {
    base: string;
    input: {
        base: string;
        sizes: FlowbiteTextInputSizes;
    };
}
export interface RangeSliderProps extends Omit<ComponentProps<"input">, "ref" | "type"> {
    sizing?: DynamicStringEnumKeysOf<FlowbiteTextInputSizes>;
    theme?: DeepPartial<FlowbiteRangeSliderTheme>;
}
export declare const RangeSlider: import("react").ForwardRefExoticComponent<RangeSliderProps & import("react").RefAttributes<HTMLInputElement>>;
