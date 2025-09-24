import type { ComponentProps, FC } from "react";
import type { DeepPartial } from "../../types";
export interface FlowbiteHRIconTheme {
    base: string;
    hrLine: string;
    icon: {
        base: string;
        icon: string;
    };
}
export interface HRIconProps extends Omit<ComponentProps<"hr">, "ref"> {
    theme?: DeepPartial<FlowbiteHRIconTheme>;
    icon?: FC<ComponentProps<"svg">>;
}
export declare const HRIcon: import("react").ForwardRefExoticComponent<HRIconProps & import("react").RefAttributes<HTMLHRElement>>;
