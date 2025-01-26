import { createElement, useState, useLayoutEffect, Fragment } from "react";
import type React from "react";

const __DEV__ = process.env.NODE_ENV === "development";

type ReactComponent<P> = React.FunctionComponent<P> | React.ComponentClass<P>;

/**
 * Create a global renderer, returns render function and Renderer component.
 * This is like a store so you should call it in the global scope.
 * @example
 * ```ts
 * const { Renderer, render } = createExternalRenderer();
 * ```
 */
export function createExternalRenderer() {
    type Payload = {
        key: React.Key;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component: ReactComponent<any>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        props?: React.ComponentProps<any>;
        children?: React.ReactNode[];
    };
    const list: Payload[] = [];
    function push<P>(component: ReactComponent<P>, props?: P, ...children: React.ReactNode[]) {
        const key = performance.now();
        const payload: Payload = { key, component, props, children };
        list.push(payload);
        if (__DEV__) {
            dispatch("render", payload);
        } else {
            dispatch();
        }

        const remove: VoidFunction = () => {
            const deleted = list.splice(
                list.findIndex(({ key: k }) => key === k),
                1
            );
            if (__DEV__) {
                dispatch("remove", deleted);
            } else {
                dispatch();
            }
        };
        const rerender = (props: P, ...children: React.ReactNode[]) => {
            payload.props = props;
            payload.children = children;
            if (__DEV__) {
                dispatch("rerender", payload);
            } else {
                dispatch();
            }
        };
        return {
            /**
             * Remove the already rendered component.
             * After calling this, you should not call `rerender` again.
             */
            remove,
            /**
             * Rerender the already rendered component.
             */
            rerender,
        };
    }
    function removeAll() {
        list.length = 0;
        dispatch("removeAll");
    }

    /**
     * @internal
     * Any present <Renderer/> have their subscriber.
     */
    const subscribers: Array<VoidFunction> = [];
    const dispatch = (tag?: string, ...reason: unknown[]) => {
        subscribers.forEach((cb) => cb());
        if (__DEV__) console.debug(`[react-external-renderer] flushing by ${tag}`, ...reason);
    };

    function Renderer() {
        const [_, setState] = useState<object>();
        /** useLayoutEffect instead of useEffect */
        useLayoutEffect(() => {
            const rerender = () => setState({});
            subscribers.push(rerender);
            return () => {
                subscribers.splice(subscribers.indexOf(rerender) >>> 0, 1);
            };
        }, []);
        return list.map(({ key, component, props, children }) =>
            createElement(Fragment, { key }, createElement(component, props, children))
        );
    }

    /** Provide <Debug> for dev */
    type DebugRenderProp = (
        list_: typeof list,
        subscribers_: typeof subscribers
    ) => React.ReactNode;
    const Debug: React.FC<{ children?: DebugRenderProp }> = __DEV__
        ? function ({ children }) {
              const [_, setState] = useState<object>();
              useLayoutEffect(() => {
                  const rerender = () => setState({});
                  rerender.__debug__ = true;
                  subscribers.push(rerender);
                  return () => {
                      subscribers.splice(subscribers.indexOf(rerender) >>> 0, 1);
                  };
              }, []);
              // render props
              if (children)
                  return children(
                      list,
                      subscribers.filter((fn) => !("__debug__" in fn))
                  );
              // default render
              return createElement(
                  "pre",
                  {
                      style: {
                          "max-width": "100%",
                          overflow: "auto",
                      },
                  },
                  JSON.stringify(
                      list.map(({ key, component, props, children }) => ({
                          key,
                          component: String(component),
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                          props,
                          children,
                      })),
                      null,
                      4
                  )
              );
          }
        : () => null;

    return {
        /** Put this component to anywhere in your app. */
        Renderer,
        /** WIP, for dev only */
        Debug,
        /** Render a component with props. */
        render: push,
        /** Remove all rendered components. */
        clear: removeAll,
    };
}
