import { type ComponentProps, type ReactNode } from "react";
import type { DeepPartial } from "../../types";
import type { FlowbiteClipboardWithIconTheme } from "./ClipboardWithIcon";
import type { FlowbiteClipboardWithIconTextTheme } from "./ClipboardWithIconText";
export interface FlowbiteClipboardTheme {
    button: {
        base: string;
        label: string;
    };
    withIcon: FlowbiteClipboardWithIconTheme;
    withIconText: FlowbiteClipboardWithIconTextTheme;
}
export interface ClipboardProps extends ComponentProps<"button"> {
    valueToCopy: string;
    label?: ReactNode;
    theme?: DeepPartial<FlowbiteClipboardTheme>;
}
export declare const Clipboard: import("react").ForwardRefExoticComponent<Omit<ClipboardProps, "ref"> & import("react").RefAttributes<HTMLButtonElement>> & {
    WithIcon: import("react").ForwardRefExoticComponent<Omit<import("./ClipboardWithIcon").ClipboardWithIconProps, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
    WithIconText: import("react").ForwardRefExoticComponent<Omit<import("./ClipboardWithIconText").ClipboardWithIconTextProps, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
};
