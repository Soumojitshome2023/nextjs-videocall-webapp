'use client';
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var tailwindMerge = require('tailwind-merge');
var mergeDeep = require('../../helpers/merge-deep.cjs');
var index = require('../../theme-store/index.cjs');
var Tooltip = require('../Tooltip/Tooltip.cjs');
var ClipboardWithIcon = require('./ClipboardWithIcon.cjs');
var ClipboardWithIconText = require('./ClipboardWithIconText.cjs');
var helpers = require('./helpers.cjs');

const ClipboardComponent = React.forwardRef(
  ({ className, valueToCopy, label, theme: customTheme = {}, ...rest }, ref) => {
    const [isJustCopied, setIsJustCopied] = React.useState(false);
    const theme = mergeDeep.mergeDeep(index.getTheme().clipboard.button, customTheme);
    return /* @__PURE__ */ jsxRuntime.jsx(Tooltip.Tooltip, { content: isJustCopied ? "Copied" : "Copy to clipboard", className: "[&_*]:cursor-pointer", children: /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        className: tailwindMerge.twMerge(theme.base, className),
        onClick: () => helpers.copyToClipboard(valueToCopy, setIsJustCopied),
        ...rest,
        ref,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: theme.label, children: label })
      }
    ) });
  }
);
ClipboardComponent.displayName = "Clipboard";
ClipboardWithIcon.ClipboardWithIcon.displayName = "Clipboard.WithIcon";
ClipboardWithIconText.ClipboardWithIconText.displayName = "Clipboard.WithIconText";
const Clipboard = Object.assign(ClipboardComponent, {
  WithIcon: ClipboardWithIcon.ClipboardWithIcon,
  WithIconText: ClipboardWithIconText.ClipboardWithIconText
});

exports.Clipboard = Clipboard;
//# sourceMappingURL=Clipboard.cjs.map
