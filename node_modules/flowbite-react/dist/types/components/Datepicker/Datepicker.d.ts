import type { DeepPartial } from "../../types";
import { type FlowbiteTextInputTheme, type TextInputProps } from "../TextInput";
import { WeekStart } from "./helpers";
import type { FlowbiteDatepickerViewsDaysTheme } from "./Views/Days";
import { type FlowbiteDatepickerViewsDecadesTheme } from "./Views/Decades";
import { type FlowbiteDatepickerViewsMonthsTheme } from "./Views/Months";
import { type FlowbiteDatepickerViewsYearsTheme } from "./Views/Years";
export interface FlowbiteDatepickerTheme {
    root: {
        base: string;
        input?: FlowbiteTextInputTheme;
    };
    popup: FlowbiteDatepickerPopupTheme;
    views: {
        days: FlowbiteDatepickerViewsDaysTheme;
        months: FlowbiteDatepickerViewsMonthsTheme;
        years: FlowbiteDatepickerViewsYearsTheme;
        decades: FlowbiteDatepickerViewsDecadesTheme;
    };
}
export interface FlowbiteDatepickerPopupTheme {
    root: {
        base: string;
        inline: string;
        inner: string;
    };
    header: {
        base: string;
        title: string;
        selectors: {
            base: string;
            button: {
                base: string;
                prev: string;
                next: string;
                view: string;
            };
        };
    };
    view: {
        base: string;
    };
    footer: {
        base: string;
        button: {
            base: string;
            today: string;
            clear: string;
        };
    };
}
export interface DatepickerRef {
    /**
     * Focus the datepicker input.
     */
    focus: () => void;
    /**
     * Clears the datepicker value back to the defaultValue.
     */
    clear: () => void;
}
export interface DatepickerProps extends Omit<TextInputProps, "theme" | "onChange" | "value" | "defaultValue"> {
    defaultValue?: Date;
    open?: boolean;
    inline?: boolean;
    autoHide?: boolean;
    showClearButton?: boolean;
    labelClearButton?: string;
    showTodayButton?: boolean;
    labelTodayButton?: string;
    minDate?: Date;
    maxDate?: Date;
    language?: string;
    weekStart?: WeekStart;
    theme?: DeepPartial<FlowbiteDatepickerTheme>;
    onChange?: (date: Date | null) => void;
    value?: Date | null;
    label?: string;
}
export declare const Datepicker: import("react").ForwardRefExoticComponent<DatepickerProps & import("react").RefAttributes<DatepickerRef>>;
