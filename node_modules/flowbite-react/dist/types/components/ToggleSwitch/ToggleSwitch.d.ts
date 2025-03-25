import type { ComponentProps } from "react";
import type { DeepPartial, DynamicStringEnumKeysOf } from "../../types";
import type { FlowbiteBoolean, FlowbiteColors } from "../Flowbite";
import type { FlowbiteTextInputSizes } from "../TextInput";
export interface FlowbiteToggleSwitchTheme {
    root: FlowbiteToggleSwitchRootTheme;
    toggle: FlowbiteToggleSwitchToggleTheme;
}
export interface FlowbiteToggleSwitchRootTheme {
    base: string;
    active: FlowbiteBoolean;
    label: string;
}
export interface FlowbiteToggleSwitchToggleTheme {
    base: string;
    sizes: FlowbiteTextInputSizes;
    checked: FlowbiteBoolean & {
        color: FlowbiteColors;
    };
}
export type ToggleSwitchProps = Omit<ComponentProps<"button">, "onChange" | "ref"> & {
    checked: boolean;
    color?: DynamicStringEnumKeysOf<FlowbiteColors>;
    sizing?: DynamicStringEnumKeysOf<FlowbiteTextInputSizes>;
    label?: string;
    onChange: (checked: boolean) => void;
    theme?: DeepPartial<FlowbiteToggleSwitchTheme>;
};
export declare const ToggleSwitch: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "onChange" | "ref"> & {
    checked: boolean;
    color?: DynamicStringEnumKeysOf<FlowbiteColors>;
    sizing?: DynamicStringEnumKeysOf<FlowbiteTextInputSizes>;
    label?: string;
    onChange: (checked: boolean) => void;
    theme?: DeepPartial<FlowbiteToggleSwitchTheme>;
} & import("react").RefAttributes<HTMLInputElement>>;
