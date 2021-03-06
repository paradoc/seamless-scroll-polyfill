import { IAnimationOptions, isObject, isScrollBehaviorSupported, original } from "./common.js";
import { windowScroll } from "./Window.scroll.js";

export { windowScroll as windowScrollTo } from "./Window.scroll.js";

export const windowScrollToPolyfill = (animationOptions?: IAnimationOptions): void => {
    if (isScrollBehaviorSupported()) {
        return;
    }

    const originalFunc = original.windowScroll;

    window.scrollTo = function scrollTo() {
        if (arguments.length === 1) {
            const scrollToOptions = arguments[0];
            if (!isObject(scrollToOptions)) {
                throw new TypeError(
                    "Failed to execute 'scrollTo' on 'Window': parameter 1 ('options') is not an object.",
                );
            }

            const left = Number(scrollToOptions.left);
            const top = Number(scrollToOptions.top);

            return windowScroll({ ...scrollToOptions, left, top, ...animationOptions });
        }

        return originalFunc.apply(this, arguments as any);
    };
};
