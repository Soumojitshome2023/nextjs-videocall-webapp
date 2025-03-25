import type { ComponentProps } from "react";
import type { DeepPartial } from "../../types";
export interface FlowbiteHRTrimmedTheme {
    base: string;
}
export interface HRTrimmedProps extends Omit<ComponentProps<"hr">, "ref"> {
    theme?: DeepPartial<FlowbiteHRTrimmedTheme>;
}
export declare const HRTrimmed: import("react").ForwardRefExoticComponent<HRTrimmedProps & import("react").RefAttributes<HTMLHRElement>>;
