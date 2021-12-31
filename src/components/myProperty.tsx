import * as React from 'react';
import { Renderer } from 'amis';
import classNames from 'classnames';

import type { RendererProps } from 'amis/lib/factory';
import type { SchemaNode } from 'amis/lib/types';

import './myProperty.less';

interface MyPropertyProps extends RendererProps {
    label: SchemaNode,
    /**
     * default '：'
     */
    separator?: string,
    text?: SchemaNode,
    /**
     * default - 
     */
    defaultText?: string,
    minTextWidth?: string | number;
}

@Renderer({
    type: 'my-property'
})
export default class extends React.Component<MyPropertyProps> {
    render() {
        return <span className={classNames('my-property', this.props.className)}>
            <span className='my-property-label'>{this.props.label}{this.props.separator || '：'}</span>
            <span className='my-property-value' style={{
                minWidth: typeof this.props.minTextWidth === 'number'
                    ? `${this.props.minTextWidth}px`
                    : this.props.minTextWidth
            }}>{this.props.text || this.props.defaultText || '-'}</span>
        </span>
    }
}