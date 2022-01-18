import * as React from 'react';
import { Renderer, classnames } from 'amis';
import LogicFlow from '@logicflow/core'
import { CurvedEdge } from '@logicflow/extension';

import type { RendererProps } from 'amis/lib/factory';
import type { GraphConfigData } from '@logicflow/core';
import type { Definition as LogicFlowOptions } from '@logicflow/core/types/options';

import '@logicflow/core/dist/style/index.css';
import './logicFlow.less';

LogicFlow.use(CurvedEdge);

interface LogicFlowProps extends RendererProps {
    options: {
        config?: LogicFlowOptions,
        data?: GraphConfigData
    }
}

interface LogicFlowState {
    lf?: LogicFlow
}

@Renderer({
    type: 'my-logic-flow'
})
export default class extends React.Component<LogicFlowProps, LogicFlowState> {
    lfRef: React.RefObject<HTMLDivElement>;

    constructor(props: LogicFlowProps) {
        super(props);
        this.lfRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount() {
        // console.log(this.props.options.config?.grid)
        const logicflow = new LogicFlow({
            ...this.props.options.config,
            container: this.lfRef.current!
        });
        logicflow.render(this.props.options.data);
        this.setState({
            lf: logicflow
        });
    }

    render() {
        return <div ref={this.lfRef} className={classnames('login-flow viewport', this.props.className)}></div>
    }
}