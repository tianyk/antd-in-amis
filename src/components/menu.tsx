import * as React from 'react';
import { Menu } from 'antd';
import { Renderer, resolveVariable, } from 'amis';

import type { MenuProps } from 'antd';
import type { SchemaNode } from 'amis/lib/types';
import type { AntdProps } from './types';

import 'antd/lib/menu/style';


type Render = (region: string, node: SchemaNode, props?: any) => JSX.Element

interface Link {
    title: SchemaNode;
    key: string;
    children?: Link[]
}

interface AntdMenuProps extends AntdProps<MenuProps> {
    links?: Link[],
    source?: string;
}

@Renderer({
    type: 'ant-menu'
})
export default class extends React.Component<AntdMenuProps> {
    link2MenuItem(link: Link, render: Render) {
        if (link.children) {
            return (<Menu.SubMenu key={link.key} title={render('body', link.title)}>
                {link.children.map(link => this.link2MenuItem(link, render))}
            </Menu.SubMenu>)
        } else {
            return (<Menu.Item key={link.key}>{render('body', link.title)}</Menu.Item>);
        }
    }

    render() {
        const links: Link[] = this.props.links || resolveVariable(this.props.source, this.props.data) || [];

        return (<Menu
            {...(this.props.options || {})}
        >
            {
                links.map(link => this.link2MenuItem(link, this.props.render))
            }
        </Menu>)
    }
}