'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var tailwindMerge = require('tailwind-merge');
var mergeDeep = require('../../helpers/merge-deep.cjs');
var index = require('../../theme-store/index.cjs');

const HRText = React.forwardRef(
  ({ theme: customTheme = {}, text, className, ...props }, ref) => {
    const theme = mergeDeep.mergeDeep(index.getTheme().hr.text, customTheme);
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: theme.base, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "hr",
        {
          className: tailwindMerge.twMerge(theme.hrLine, className),
          "data-testid": "flowbite-hr-text",
          role: "separator",
          ref,
          ...props
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: theme.text, children: text })
    ] });
  }
);

exports.HRText = HRText;
//# sourceMappingURL=HRText.cjs.map
