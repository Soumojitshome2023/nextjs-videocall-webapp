import { jsxs, jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep.mjs';
import { getTheme } from '../../theme-store/index.mjs';

const HRText = forwardRef(
  ({ theme: customTheme = {}, text, className, ...props }, ref) => {
    const theme = mergeDeep(getTheme().hr.text, customTheme);
    return /* @__PURE__ */ jsxs("div", { className: theme.base, children: [
      /* @__PURE__ */ jsx(
        "hr",
        {
          className: twMerge(theme.hrLine, className),
          "data-testid": "flowbite-hr-text",
          role: "separator",
          ref,
          ...props
        }
      ),
      /* @__PURE__ */ jsx("span", { className: theme.text, children: text })
    ] });
  }
);

export { HRText };
//# sourceMappingURL=HRText.mjs.map
