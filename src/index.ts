import { createElement, useState, useLayoutEffect, Fragment } from "react";
import type React from "react";

const __DEV__ = process.env.NODE_ENV === "development";

type ReactComponent<P> = React.FunctionComponent<P> | React.ComponentClass<P>;

/**
 * do not relay on context
 */
export function createExternalRenderer() {
    const list: Array<{
        key: number;
        component: ReactComponent<any>;
        props?: any;
        children?: React.ReactNode[];
    }> = [];
    function push<P>(component: ReactComponent<P>, props?: P, ...children: React.ReactNode[]) {
        const key = performance.now();
        const payload = { key, component, props, children };
        list.push(payload);
        dispatch("render", payload);

        const remove = () => {
            const deleted = list.splice(list.findIndex(({ key: k }) => key === k)!, 1);
            dispatch("remove", deleted);
        };
        const rerender = (props: P, ...children: React.ReactNode[]) => {
            payload.props = props;
            payload.children = children;
            dispatch("rerender", payload);
        };
        return { remove, rerender };
    }
    function removeAll() {
        list.length = 0;
        dispatch("removeAll");
    }

    /** Any present <Renderer/> have their subscriber */
    const subscribers: Array<VoidFunction> = [];
    const dispatch = (tag: string, ...reason: any[]) => {
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
              if (children)
                  return children(
                      list,
                      subscribers.filter((fn) => !("__debug__" in fn))
                  );
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
        Renderer,
        Debug,
        render: push,
        clear: removeAll,
    };
}
