'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var tailwindMerge = require('tailwind-merge');
var mergeDeep = require('../../helpers/merge-deep.cjs');
var index = require('../../theme-store/index.cjs');

const HRSquare = React.forwardRef(
  ({ theme: customTheme = {}, className, ...props }, ref) => {
    const theme = mergeDeep.mergeDeep(index.getTheme().hr.square, customTheme);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "hr",
      {
        className: tailwindMerge.twMerge(theme.base, className),
        role: "separator",
        "data-testid": "flowbite-hr-square",
        ref,
        ...props
      }
    );
  }
);

exports.HRSquare = HRSquare;
//# sourceMappingURL=HRSquare.cjs.map
