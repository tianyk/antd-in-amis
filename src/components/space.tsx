import * as React from 'react';
import { Space } from 'antd';
import { Renderer } from 'amis';

import type { SchemaNode } from 'amis/lib/types';
import { SpaceProps } from 'antd';
import type { AntdProps } from './types';

import 'antd/lib/space/style';


interface AntdSpaceProps extends AntdProps<SpaceProps> {
    body?: SchemaNode
}

@Renderer({
    type: 'ant-space'
})
export default class extends React.Component<AntdSpaceProps> {
    render() {
        return <Space {...(this.props.options || {})}>
            {
                this.props.body
                    ? this.props.render('body', this.props.body)
                    : null
            }
        </Space>
    }
}