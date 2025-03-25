'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var tailwindMerge = require('tailwind-merge');
var mergeDeep = require('../../helpers/merge-deep.cjs');
var index = require('../../theme-store/index.cjs');
var HRIcon = require('./HRIcon.cjs');
var HRSquare = require('./HRSquare.cjs');
var HRText = require('./HRText.cjs');
var HRTrimmed = require('./HRTrimmed.cjs');

const HRComponent = React.forwardRef(({ theme: customTheme = {}, className, ...props }, ref) => {
  const theme = mergeDeep.mergeDeep(index.getTheme().hr.root, customTheme);
  return /* @__PURE__ */ jsxRuntime.jsx("hr", { className: tailwindMerge.twMerge(theme.base, className), role: "separator", "data-testid": "flowbite-hr", ref, ...props });
});
HRComponent.displayName = "HR";
HRTrimmed.HRTrimmed.displayName = "HR.Trimmed";
HRIcon.HRIcon.displayName = "HR.Icon";
HRText.HRText.displayName = "HR.Text";
HRSquare.HRSquare.displayName = "HR.Square";
const HR = Object.assign(HRComponent, {
  Trimmed: HRTrimmed.HRTrimmed,
  Icon: HRIcon.HRIcon,
  Text: HRText.HRText,
  Square: HRSquare.HRSquare
});

exports.HR = HR;
//# sourceMappingURL=HR.cjs.map
