import * as React from 'react';
import { Calendar } from 'antd';
import { Renderer } from 'amis';

import type { CalendarProps } from 'antd';
import type { Moment } from 'moment';
import type { AntdProps } from './types';

import 'antd/lib/calendar/style';

interface AntdCalendarProps extends AntdProps<CalendarProps<Moment>> {
}

@Renderer({
    type: 'ant-calendar'
})
export default class extends React.Component<AntdCalendarProps> {
    render() {
        return <Calendar {...(this.props.options || {})} />
    }
}