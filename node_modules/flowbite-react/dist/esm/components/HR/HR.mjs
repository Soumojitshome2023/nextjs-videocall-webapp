import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep.mjs';
import { getTheme } from '../../theme-store/index.mjs';
import { HRIcon } from './HRIcon.mjs';
import { HRSquare } from './HRSquare.mjs';
import { HRText } from './HRText.mjs';
import { HRTrimmed } from './HRTrimmed.mjs';

const HRComponent = forwardRef(({ theme: customTheme = {}, className, ...props }, ref) => {
  const theme = mergeDeep(getTheme().hr.root, customTheme);
  return /* @__PURE__ */ jsx("hr", { className: twMerge(theme.base, className), role: "separator", "data-testid": "flowbite-hr", ref, ...props });
});
HRComponent.displayName = "HR";
HRTrimmed.displayName = "HR.Trimmed";
HRIcon.displayName = "HR.Icon";
HRText.displayName = "HR.Text";
HRSquare.displayName = "HR.Square";
const HR = Object.assign(HRComponent, {
  Trimmed: HRTrimmed,
  Icon: HRIcon,
  Text: HRText,
  Square: HRSquare
});

export { HR };
//# sourceMappingURL=HR.mjs.map
