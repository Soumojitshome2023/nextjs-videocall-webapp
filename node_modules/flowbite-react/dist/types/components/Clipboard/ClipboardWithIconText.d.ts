import { type ComponentProps, type FC } from "react";
import type { DeepPartial } from "../../types";
export interface FlowbiteClipboardWithIconTextTheme {
    base: string;
    label: {
        base: string;
        defaultText: string;
        successText: string;
    };
    icon: {
        defaultIcon: string;
        successIcon: string;
    };
}
export interface ClipboardWithIconTextProps extends ComponentProps<"button"> {
    valueToCopy: string;
    label?: string;
    icon?: FC<ComponentProps<"svg">>;
    theme?: DeepPartial<FlowbiteClipboardWithIconTextTheme>;
}
export declare const ClipboardWithIconText: import("react").ForwardRefExoticComponent<Omit<ClipboardWithIconTextProps, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
