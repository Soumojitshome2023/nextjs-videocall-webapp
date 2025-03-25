import type { ComponentProps } from "react";
import type { DeepPartial } from "../../types";
export interface FlowbiteHRSquareTheme {
    base: string;
}
export interface HRSquareProps extends Omit<ComponentProps<"hr">, "ref"> {
    theme?: DeepPartial<FlowbiteHRSquareTheme>;
}
export declare const HRSquare: import("react").ForwardRefExoticComponent<HRSquareProps & import("react").RefAttributes<HTMLHRElement>>;
