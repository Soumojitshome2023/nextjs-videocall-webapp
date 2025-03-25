import { type ComponentProps, type FC } from "react";
import type { DeepPartial } from "../../types";
export interface FlowbiteClipboardWithIconTheme {
    base: string;
    icon: {
        defaultIcon: string;
        successIcon: string;
    };
}
export interface ClipboardWithIconProps extends ComponentProps<"button"> {
    valueToCopy: string;
    icon?: FC<ComponentProps<"svg">>;
    theme?: DeepPartial<FlowbiteClipboardWithIconTheme>;
}
export declare const ClipboardWithIcon: import("react").ForwardRefExoticComponent<Omit<ClipboardWithIconProps, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
