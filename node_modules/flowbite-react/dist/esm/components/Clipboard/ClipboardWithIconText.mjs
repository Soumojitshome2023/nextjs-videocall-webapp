'use client';
import { jsx, jsxs } from 'react/jsx-runtime';
import { forwardRef, useState } from 'react';
import { FaCheck, FaClipboardList } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep.mjs';
import { getTheme } from '../../theme-store/index.mjs';
import { copyToClipboard } from './helpers.mjs';

const ClipboardWithIconText = forwardRef(
  ({ valueToCopy, icon: Icon = FaClipboardList, label = "Copy", theme: customTheme = {}, className, ...rest }, ref) => {
    const [isJustCopied, setIsJustCopied] = useState(false);
    const theme = mergeDeep(getTheme().clipboard.withIconText, customTheme);
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: twMerge(theme.base, className),
        onClick: () => copyToClipboard(valueToCopy, setIsJustCopied),
        ...rest,
        ref,
        children: isJustCopied ? /* @__PURE__ */ jsxs("span", { className: theme.label.base, children: [
          /* @__PURE__ */ jsx(FaCheck, { "aria-hidden": true, className: theme.icon.successIcon }),
          /* @__PURE__ */ jsx("span", { className: theme.label.successText, children: "Copied" })
        ] }) : /* @__PURE__ */ jsxs("span", { className: theme.label.base, children: [
          /* @__PURE__ */ jsx(Icon, { "aria-hidden": true, className: theme.icon.defaultIcon }),
          /* @__PURE__ */ jsx("span", { className: theme.label.defaultText, children: label })
        ] })
      }
    );
  }
);

export { ClipboardWithIconText };
//# sourceMappingURL=ClipboardWithIconText.mjs.map
