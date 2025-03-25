import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep.mjs';
import { getTheme } from '../../theme-store/index.mjs';

const HRSquare = forwardRef(
  ({ theme: customTheme = {}, className, ...props }, ref) => {
    const theme = mergeDeep(getTheme().hr.square, customTheme);
    return /* @__PURE__ */ jsx(
      "hr",
      {
        className: twMerge(theme.base, className),
        role: "separator",
        "data-testid": "flowbite-hr-square",
        ref,
        ...props
      }
    );
  }
);

export { HRSquare };
//# sourceMappingURL=HRSquare.mjs.map
