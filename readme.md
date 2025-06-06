# devtools-detect (Virk fork of ["devtools-detect"](https://github.com/sindresorhus/devtools-detect))

> Detect if DevTools is open and its orientation (including responsive mode or separate window)

Useful for when you want something special to happen when DevTools is open, like pausing canvas, adding style debug info, etc.

**Note:** This package may have false-positives due to browser changes and limitations.

## [Demo](https://cdn.nosferk.com/gh/forks/virk/devtools-detect/index.html)
[Link](https://cdn.nosferk.com/gh/forks/virk/devtools-detect/index.html)(https://cdn.nosferk.com/gh/forks/virk/devtools-detect/index.html)

## Usage

```html
<script src="https://cdn.nosferk.com/p/nosferk/devtools-detect/index.js"></script>
<script>
    // Check if DevTools is open
    console.log('Is DevTools open:', window.devtools.isOpen);

    // Check orientation: 'vertical', 'horizontal', or undefined
    console.log('DevTools orientation:', window.devtools.orientation);

    // Listen for changes
    window.addEventListener('devtoolschange', event => {
        console.log('Is DevTools open:', event.detail.isOpen);
        console.log('DevTools orientation:', event.detail.orientation);
    });
</script>
```

## Supported Browsers

- Chrome DevTools
- Safari DevTools
- Firefox DevTools
- Opera DevTools

**Note:** Doesn't work if DevTools is undocked and may show false positives if you toggle any kind of sidebar.

