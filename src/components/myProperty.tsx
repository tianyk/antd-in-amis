import * as React from 'react';
import { classnames, Renderer } from 'amis';
import classNames from 'classnames';
import { isNil } from 'lodash';

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

    labelClassName?: string,
    textClassName?: string
}

@Renderer({
    type: 'my-property'
})
export default class extends React.Component<MyPropertyProps> {
    render() {
        const defaultText = isNil(this.props.defaultText) ? '-' : this.props.defaultText;
        const separator = isNil(this.props.separator) ? '：' : this.props.separator;

        return <span className={classNames('my-property', this.props.className)}>
            {
                this.props.label
                    ? <span className={classnames('my-property-label', this.props.labelClassName)}>{this.props.render('body', `${this.props.label}${separator}`)}</span>
                    : null
            }
            <span className={classnames('my-property-value', this.props.textClassName)}>
                {this.props.render('body', this.props.text || defaultText)}
            </span>
        </span >
    }
}