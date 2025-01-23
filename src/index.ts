import { createElement, useState, useLayoutEffect, Fragment } from "react";
import type React from "react";

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
        dispatch();

        const remove = () => {
            list.splice(list.findIndex(({ key: k }) => key === k)!, 1);
            dispatch();
        };
        const rerender = (props: P, ...children: React.ReactNode[]) => {
            payload.props = props;
            payload.children = children;
            dispatch();
        };
        return { remove, rerender };
    }
    function removeAll() {
        list.length = 0;
        dispatch();
    }

    /** any present <Renderer/> have their subscriber */
    const subscribers: Array<VoidFunction> = [];
    const dispatch = () => subscribers.forEach((cb) => cb());

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
    return {
        Renderer,
        render: push,
        clear: removeAll,
    };
}
