import type { ComponentProps, FC } from "react";
import type { DeepPartial, DynamicStringEnumKeysOf } from "../../types";
import type { FlowbiteColors } from "../Flowbite";
export interface FlowbiteSidebarCTATheme {
    base: string;
    color: FlowbiteSidebarCTAColors;
}
export interface SidebarCTAProps extends Omit<ComponentProps<"div">, "color"> {
    color?: DynamicStringEnumKeysOf<FlowbiteSidebarCTAColors>;
    theme?: DeepPartial<FlowbiteSidebarCTATheme>;
}
export interface FlowbiteSidebarCTAColors extends Pick<FlowbiteColors, "blue" | "dark" | "failure" | "gray" | "green" | "light" | "purple" | "red" | "success" | "warning" | "yellow"> {
    [key: string]: string;
}
export declare const SidebarCTA: FC<SidebarCTAProps>;
