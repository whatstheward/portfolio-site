import { useRef, useLayoutEffect } from 'react'

// var will hold value if DOM has loaded (window context exists)
const isBrowser = typeof window !== `undefined`;

// helper fn, checks DOM loaded, sets init values, gets scroll position
function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 };

  // element passed in from useRef, so element.current is target
  const target = element ? element.current : document.body;

  // holds scroll position from element.current or document.body
  // getBoundingClientRect() returns DOMRect object (CSS border boxes)
  const position = target.getBoundingClientRect();

  // gives client option: window.scroll || getBoundingClientRect()
  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
};

// main fn, 
function useScrollPosition(effect, deps, element, useWindow, wait) {
    // effect 

    // useRef instead of useState to minimize rerenders
    const position = useRef(getScrollPosition({ useWindow }));

    //
    let throttleTimeout = null;

    const callBack = () => {
        const currPos = getScrollPosition({ element, useWindow })
        effect({ prevPos: position.current, currPos });
        position.current = currPos;
        throttleTimeout = null;
    };

    // inherent react hook, effectively cDidMount + cDidUpdate
    // sync fn, called between DOM calcs and browser repaint
    useLayoutEffect(() => {

        // avoids excessive cycling by using setTimeout to throttle executions
        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(callBack, wait);
                };
            } else {
                callBack();
            };
        };

        // mounts event listener on cDidMount
        window.addEventListener('scroll', handleScroll);

        // fns returned by Effect hooks are run at cleanup time
        return () => window.removeEventListener('scroll', handleScroll)
    }, deps);
};

export default useScrollPosition;