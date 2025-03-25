import type { ComponentProps } from "react";
import type { DeepPartial } from "../../types";
import type { FlowbiteHRIconTheme } from "./HRIcon";
import type { FlowbiteHRSquareTheme } from "./HRSquare";
import type { FlowbiteHRTextTheme } from "./HRText";
import type { FlowbiteHRTrimmedTheme } from "./HRTrimmed";
export interface FlowbiteHRTheme {
    root: {
        base: string;
    };
    trimmed: FlowbiteHRTrimmedTheme;
    icon: FlowbiteHRIconTheme;
    text: FlowbiteHRTextTheme;
    square: FlowbiteHRSquareTheme;
}
export interface HRProps extends Omit<ComponentProps<"hr">, "ref"> {
    theme?: DeepPartial<FlowbiteHRTheme>;
}
export declare const HR: import("react").ForwardRefExoticComponent<HRProps & import("react").RefAttributes<HTMLHRElement>> & {
    Trimmed: import("react").ForwardRefExoticComponent<import("./HRTrimmed").HRTrimmedProps & import("react").RefAttributes<HTMLHRElement>>;
    Icon: import("react").ForwardRefExoticComponent<import("./HRIcon").HRIconProps & import("react").RefAttributes<HTMLHRElement>>;
    Text: import("react").ForwardRefExoticComponent<import("./HRText").HRTextProps & import("react").RefAttributes<HTMLHRElement>>;
    Square: import("react").ForwardRefExoticComponent<import("./HRSquare").HRSquareProps & import("react").RefAttributes<HTMLHRElement>>;
};
