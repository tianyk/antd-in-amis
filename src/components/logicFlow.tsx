import * as React from 'react';
import autoBindReact from 'auto-bind/react';
import { FormItem, classnames } from 'amis';

import LogicFlow from '@logicflow/core'
import { CurvedEdge } from '@logicflow/extension';

import type { FormControlProps } from 'amis/lib/renderers/Form/Item';
import type { GraphConfigData } from '@logicflow/core';
import type { Definition as LogicFlowOptions } from '@logicflow/core/types/options';

import '@logicflow/core/dist/style/index.css';
import './logicFlow.less';

LogicFlow.use(CurvedEdge);

type Listener = () => void;

interface LogicFlowProps extends FormControlProps {
    value?: GraphConfigData | string,
    options: {
        config?: LogicFlowOptions,
        listeners?: Record<string, Listener>,
    }
}

interface LogicFlowState {
    lf?: LogicFlow
}

@FormItem({
    type: 'my-logic-flow'
})
export default class extends React.Component<LogicFlowProps, LogicFlowState> {
    lfRef: React.RefObject<HTMLDivElement>;

    constructor(props: LogicFlowProps) {
        super(props);
        this.lfRef = React.createRef<HTMLDivElement>();
        autoBindReact(this);
    }

    onChange() {
        const lf = this.state.lf;
        const graphData = lf?.getGraphData();
        this.props.onChange(graphData);
    }

    componentDidMount() {
        const logicflow = new LogicFlow({
            ...this.props.options?.config,
            container: this.lfRef.current!
        });
        // 绑定事件
        if (this.props.options?.listeners) {
            // 绑定事件
            for (let eventName in this.props.options.listeners) {
                const listener = this.props.options.listeners[eventName];
                logicflow.on(eventName, function (...args) {
                    listener.apply(this, [...args, logicflow]);
                });
            }
        }
        // 监听变化，触发onChange
        // @see http://logic-flow.org/api/eventCenterApi.html#%E8%8A%82%E7%82%B9%E4%BA%8B%E4%BB%B6
        [
            'node:delete',
            'node:add',
            'node:dnd-add',
            'node:dnd-drag',
            'node:dragstart',
            'node:drag',
            'node:drop',

            'edge:add',
            'edge:delete',
            'edge:adjust',
            'edge:exchange-node',
            'connection:not-allowed',

            'text:update'
        ].forEach((eventName) => {
            logicflow.on(eventName, this.onChange);
        });

        let graphData = this.props.value;
        if (typeof graphData === 'string') graphData = JSON.parse(graphData);
        logicflow?.render(graphData);

        this.setState({
            lf: logicflow
        });
    }

    componentDidUpdate(prevProps: LogicFlowProps) {
        if (this.props.value !== prevProps.value) {
            const lf = this.state.lf;
            lf?.clearData();

            let graphData = this.props.value;
            if (typeof graphData === 'string') graphData = JSON.parse(graphData);
            lf?.render(graphData);
        }
    }

    render() {
        return <div ref={this.lfRef} className={classnames('login-flow viewport', this.props.className)}></div>
    }
}