import * as React from 'react';
import styled from 'styled-components';
import asRendition from '../asRendition';
import { DefaultProps, RenditionSystemProps } from '../common-types';
import { radius } from '../theme';
import { monospace, px } from '../utils';

const Base = styled.textarea`
	border-radius: ${px(radius)};
	font-size: inherit;
	border: 1px solid ${props => props.theme.colors.gray.main};
	padding: 8px 16px;
	resize: vertical;
	display: block;
	width: 100%;

	&:hover {
		box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
	}
	&::placeholder {
		color: ${props => props.theme.colors.gray.main};
	}

	${monospace};
`;

const Component = ({
	autoRows,
	maxRows,
	minRows,
	rows,
	...props
}: InternalTextareaProps) => {
	let rowsProp = rows;

	if (autoRows && props.onChange) {
		rowsProp = (props.value || '').split('\n').length;
	}

	if (maxRows && (rowsProp || 0) > maxRows) {
		rowsProp = maxRows;
	}

	if (minRows && (rowsProp || 0) < minRows) {
		rowsProp = minRows;
	}

	return <Base rows={rowsProp} {...props} />;
};

export interface InternalTextareaProps extends DefaultProps {
	monospace?: boolean;
	autoComplete?: string;
	autoFocus?: boolean;
	cols?: number;
	dirName?: string;
	disabled?: boolean;
	form?: string;
	maxLength?: number;
	minLength?: number;
	name?: string;
	placeholder?: string;
	readOnly?: boolean;
	required?: boolean;
	rows?: number;
	value?: string;
	wrap?: string;

	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
	autoRows?: boolean;
	maxRows?: number;
	minRows?: number;
}

export type TextareaProps = InternalTextareaProps & RenditionSystemProps;

export default asRendition<React.FunctionComponent<TextareaProps>>(Component);
