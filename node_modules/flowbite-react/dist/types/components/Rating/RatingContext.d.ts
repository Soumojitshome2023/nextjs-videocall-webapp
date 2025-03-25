import { DynamicStringEnumKeysOf } from "../../types";
import type { FlowbiteRatingTheme } from "./Rating";
import type { FlowbiteStarSizes } from "./RatingStar";
export type RatingContext = {
    theme: FlowbiteRatingTheme;
    size?: DynamicStringEnumKeysOf<FlowbiteStarSizes>;
};
export declare const RatingContext: import("react").Context<RatingContext | undefined>;
export declare function useRatingContext(): RatingContext;
