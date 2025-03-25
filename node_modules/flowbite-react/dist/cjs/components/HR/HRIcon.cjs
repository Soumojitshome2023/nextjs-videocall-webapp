'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var fa6 = require('react-icons/fa6');
var tailwindMerge = require('tailwind-merge');
var mergeDeep = require('../../helpers/merge-deep.cjs');
var index = require('../../theme-store/index.cjs');

const HRIcon = React.forwardRef(
  ({ theme: customTheme = {}, icon: Icon = fa6.FaQuoteRight, className, ...props }, ref) => {
    const theme = mergeDeep.mergeDeep(index.getTheme().hr.icon, customTheme);
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: theme.base, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "hr",
        {
          className: tailwindMerge.twMerge(theme.hrLine, className),
          role: "separator",
          "data-testid": "flowbite-hr-icon",
          ref,
          ...props
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: theme.icon.base, children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { "aria-hidden": true, className: theme.icon.icon }) })
    ] });
  }
);

exports.HRIcon = HRIcon;
//# sourceMappingURL=HRIcon.cjs.map
