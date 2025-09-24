import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep.mjs';
import { getTheme } from '../../theme-store/index.mjs';

const HRTrimmed = forwardRef(
  ({ theme: customTheme = {}, className, ...props }, ref) => {
    const theme = mergeDeep(getTheme().hr.trimmed, customTheme);
    return /* @__PURE__ */ jsx(
      "hr",
      {
        className: twMerge(theme.base, className),
        role: "separator",
        "data-testid": "flowbite-hr-trimmed",
        ref,
        ...props
      }
    );
  }
);

export { HRTrimmed };
//# sourceMappingURL=HRTrimmed.mjs.map
