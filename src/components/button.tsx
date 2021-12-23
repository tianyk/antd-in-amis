import * as React from 'react';
import { Button } from 'antd';
import { Renderer } from 'amis';

import type { SchemaNode } from 'amis/lib/types';
import { ButtonProps } from 'antd';
import type { AntdProps } from './types';

import 'antd/lib/button/style';


interface AntdButtonProps extends AntdProps<ButtonProps> {
    body?: SchemaNode
}

@Renderer({
    type: 'ant-button'
})
export default class extends React.Component<AntdButtonProps> {
    render() {
        return <Button {...(this.props.options || {})}>
            {
                this.props.body
                    ? this.props.render('body', this.props.body)
                    : null
            }
        </Button>
    }
}