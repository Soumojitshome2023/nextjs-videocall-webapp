import { jsx } from 'react/jsx-runtime';
import { useMemo, Children, isValidElement, cloneElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep.mjs';
import { getTheme } from '../../theme-store/index.mjs';
import { Button } from './Button.mjs';

const processChildren = (children, outline, pill) => {
  return Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      const positionInGroupProp = child.type == Button ? { positionInGroup: determinePosition(index, Children.count(children)) } : {};
      if (child.props.children) {
        return cloneElement(child, {
          ...child.props,
          children: processChildren(child.props.children, outline, pill),
          ...positionInGroupProp
        });
      } else {
        return cloneElement(child, {
          outline,
          pill,
          ...positionInGroupProp
        });
      }
    }
    return child;
  });
};
const determinePosition = (index, totalChildren) => {
  return index === 0 ? "start" : index === totalChildren - 1 ? "end" : "middle";
};
const ButtonGroup = ({
  children,
  className,
  outline,
  pill,
  theme: customTheme = {},
  ...props
}) => {
  const items = useMemo(() => processChildren(children, outline, pill), [children, outline, pill]);
  const theme = mergeDeep(getTheme().buttonGroup, customTheme);
  return /* @__PURE__ */ jsx("div", { className: twMerge(theme.base, className), role: "group", ...props, children: items });
};
ButtonGroup.displayName = "Button.Group";

export { ButtonGroup };
//# sourceMappingURL=ButtonGroup.mjs.map
