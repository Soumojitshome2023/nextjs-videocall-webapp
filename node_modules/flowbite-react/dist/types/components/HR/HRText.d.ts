import type { ComponentProps } from "react";
import type { DeepPartial } from "../../types";
export interface FlowbiteHRTextTheme {
    base: string;
    hrLine: string;
    text: string;
}
export interface HRTextProps extends Omit<ComponentProps<"hr">, "ref"> {
    text: string;
    theme?: DeepPartial<FlowbiteHRTextTheme>;
}
export declare const HRText: import("react").ForwardRefExoticComponent<HRTextProps & import("react").RefAttributes<HTMLHRElement>>;
