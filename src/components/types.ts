import type { RendererProps } from 'amis/lib/factory';

export interface AntdProps<T> extends RendererProps {
    options?: T
}