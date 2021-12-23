import * as React from 'react';
import { Empty } from 'antd';
import { Renderer } from 'amis';

import type { SchemaNode } from 'amis/lib/types';
import { EmptyProps } from 'antd';
import type { AntdProps } from './types';

import 'antd/lib/empty/style';


interface AntdEmptyProps extends AntdProps<EmptyProps> {
    body?: SchemaNode
}

@Renderer({
    type: 'ant-empty'
})
export default class extends React.Component<AntdEmptyProps> {
    render() {
        let image: string | React.ReactNode = this.props.options?.image;
        if (image === 'PRESENTED_IMAGE_DEFAULT') {
            image = Empty.PRESENTED_IMAGE_DEFAULT;
        } else if (image === 'PRESENTED_IMAGE_SIMPLE') {
            image = Empty.PRESENTED_IMAGE_SIMPLE;
        }

        return <Empty {...(this.props.options || {})} image={image} >
            {
                this.props.body
                    ? this.props.render('body', this.props.body)
                    : null
            }
        </Empty>
    }
}