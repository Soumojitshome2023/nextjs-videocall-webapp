import { jsxs, jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { FaQuoteRight } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep.mjs';
import { getTheme } from '../../theme-store/index.mjs';

const HRIcon = forwardRef(
  ({ theme: customTheme = {}, icon: Icon = FaQuoteRight, className, ...props }, ref) => {
    const theme = mergeDeep(getTheme().hr.icon, customTheme);
    return /* @__PURE__ */ jsxs("div", { className: theme.base, children: [
      /* @__PURE__ */ jsx(
        "hr",
        {
          className: twMerge(theme.hrLine, className),
          role: "separator",
          "data-testid": "flowbite-hr-icon",
          ref,
          ...props
        }
      ),
      /* @__PURE__ */ jsx("div", { className: theme.icon.base, children: /* @__PURE__ */ jsx(Icon, { "aria-hidden": true, className: theme.icon.icon }) })
    ] });
  }
);

export { HRIcon };
//# sourceMappingURL=HRIcon.mjs.map
