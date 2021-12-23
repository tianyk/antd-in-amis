import * as React from 'react';
import { BackTop } from 'antd';
import { Renderer } from 'amis';

import type { SchemaNode } from 'amis/lib/types';
import { BackTopProps } from 'antd';
import type { AntdProps } from './types';

import 'antd/lib/back-top/style';


interface AntdEmptyProps extends AntdProps<BackTopProps> {
    body?: SchemaNode
}

@Renderer({
    type: 'ant-back-top'
})
export default class extends React.Component<AntdEmptyProps> {
    render() {
        return <BackTop {...(this.props.options || {})}>
            {
                this.props.body
                    ? this.props.render('body', this.props.body)
                    : null
            }
        </BackTop>
    }
}