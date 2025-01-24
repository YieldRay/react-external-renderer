# react-external-renderer

`react-external-renderer` is a library that allows you to render any component simply and declaratively using React.

> Inspired by [overlay-kit](https://overlay-kit.slash.page/).

## Installation

```
npm i react-external-renderer
```

```ts
import { createExternalRenderer } from "react-external-renderer";
```

## Code Comparison

**Before**

```tsx
import { useState } from "react";

function Before() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open</Button>
            {/* We have to put <Dialog/> here */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
```

**After**

```tsx
const { render, Renderer, Debug } = createExternalRenderer();

function After() {
    const openDialog = () => {
        // Extract the props for readability
        const defaultProps = { isOpen: true };
        const closedProps = { isOpen: false };
        const { rerender } = render(
            ({ isOpen }) => <Dialog open={isOpen} onClose={() => rerender(closedProps)} />,
            defaultProps
        );
    };

    return (
        <>
            <Button onClick={openDialog}>Open</Button>
            {/* You can place <Renderer /> anywhere; 
                it doesn't need to be in the same component */}
            <Renderer />
        </>
    );
}
```

**External Render**

```tsx
const { render, Renderer, Debug } = createExternalRenderer();

function Root() {
    return (
        <>
            <App />
            <Renderer />
        </>
    );
}

function App() {
    const openDialog = () => {
        const { rerender } = render(
            ({ isOpen }) => <Dialog open={isOpen} onClose={() => rerender({ isOpen: false })} />,
            { isOpen: true }
        );
    };

    return <Button onClick={openDialog}>Open</Button>;
}
```

More demos can be found in the [docs](https://yieldray.github.io/react-external-renderer/)

## Avoiding Memory Leaks

You can use `react-external-renderer` to render anything, but when you call `render`, you must call `remove` when you no longer want to `rerender`.

Using a modal as an example, since a modal might first show an exit animation and then unmount, you can do the following:

```tsx
/** This is a real-world case using <Modal/> from the antd library */
function App() {
    const openDialog = () => {
        const { rerender, remove } = render(
            ({ isOpen }) => {
                const close = () => rerender({ isModalOpen: false });
                return (
                    <Modal
                        open={isOpen}
                        onOk={close}
                        onCancel={close}
                        afterClose={remove} // Add this
                    />
                );
            },
            { isOpen: true }
        );
    };

    return <Button onClick={openDialog}>Open</Button>;
}
```

Since we only want to render the modal once here, when there is no exit animation, you can simply call `remove`:

```tsx
function App() {
    const openDialog = () => {
        const { remove } = render(({ isOpen }) => <Dialog open={isOpen} onClose={remove} />, {
            isOpen: true,
        });
    };

    return <Button onClick={openDialog}>Open</Button>;
}
```
