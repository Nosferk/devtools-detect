/*! 
  devtools-detect (Virk fork)
  Detect if DevTools is open (inclusive em modo responsivo ou em janela separada)
  MIT License
*/
(function () {
    'use strict';

    const devtools = {
        isOpen: false,
        orientation: undefined
    };

    const defaultOptions = {
        sizeThreshold: 160,
        debugThreshold: 100,
        pollInterval: 500
    };

    const emitEvent = (isOpen, orientation) => {
        window.dispatchEvent(new CustomEvent('devtoolschange', {
            detail: { isOpen, orientation }
        }));
    };

    function detectByDebugger(debugThreshold) {
        const t0 = performance.now();
        debugger;
        const t1 = performance.now();
        return (t1 - t0) > debugThreshold;
    }

    function detect({ sizeThreshold, debugThreshold, emitEvents }) {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        const bySize = widthDiff > sizeThreshold || heightDiff > sizeThreshold;

        let orientation;
        if (bySize) {
            orientation = (widthDiff > sizeThreshold) ? 'vertical' : 'horizontal';
        } else {
            orientation = undefined;
        }

        const byDebug = detectByDebugger(debugThreshold);

        const isOpenNow = bySize || byDebug;

        if (isOpenNow) {
            if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
                emitEvent(true, orientation);
            }
            devtools.isOpen = true;
            devtools.orientation = orientation;
        } else {
            if (devtools.isOpen && emitEvents) {
                emitEvent(false, undefined);
            }
            devtools.isOpen = false;
            devtools.orientation = undefined;
        }
    }

    (function loop(opts) {
        detect(opts);
        window.requestAnimationFrame(() => loop(opts));
    })(Object.assign({ emitEvents: true }, defaultOptions)); // Fix: emitEvents should be true for UI updates

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = devtools;
    } else {
        window.devtools = devtools;
    }
})();