import styled, { withTheme } from 'styled-components'
import hoc from '../hoc'
import { bold, px, lighten } from '../utils'
import { compose, withProps } from 'recompose'
import get from 'lodash/get'

const Base = styled.button`
  font-family: inherit;
  display: inline-block;
  font-weight: ${props => bold(props)};
  border-radius: ${props => px(props.theme.radius)};
  appearance: none;
  text-decoration: none;
  border: 0;
  margin: 0;
  vertical-align: middle;
  font-size: inherit;
  line-height: 1.1;
  text-align: center;
  cursor: pointer;
  background: ${props => props.bg};
  color: ${props => props.color};
  border-color: ${props => props.borderColor || props.color};
  border: ${props => props.border};

  &:hover,
  &:focus,
  &:active {
    color: ${props => props.active.color};
    background-color: ${props => props.active.bg};
    border: ${props => props.active.border};
  }

  '&:disabled': {
    opacity: 1/4;
  }
`

const emphasized = withProps(props => {
  if (props.emphasized) {
    return {
      px: 5,
      py: 2
    }
  }
})

const setDefaultProps = withProps(props => {
  // set defaults
  // always allow override with provided props
  const color = props.color || props.theme.colors.text.main
  return Object.assign(
    {
      bg: 'transparent',
      color: color,
      px: 4,
      py: 2,
      border: '1px solid',
      borderColor: lighten(color),
      active: {
        color: '#fff',
        bg: color
      }
    },
    props
  )
})

const getType = withProps(props => {
  // get primary, tertiary, secondary and set as props.type
  const type = Object.keys(props).find(b =>
    Object.keys(props.theme.colors).find(k => k === b)
  )
  props.type = type
  return props
})

const setTypeProps = withProps(({ type, theme }) => {
  // set type colors
  if (!type) return

  return {
    color: '#fff',
    bg: get(theme.colors[type], 'main'),
    active: {
      color: '#fff',
      bg: get(theme.colors[type], 'dark')
    }
  }
})

const outline = withProps(({ outline, color, bg, border, active }) => {
  // get primary, tertiary, secondary and set as props.type
  if (!outline) return

  return {
    bg: color,
    color: bg !== 'transparent' ? bg : '#fff',
    border: border || '1px solid',
    active: {
      color: active.bg,
      bg: active.color
    }
  }
})

export default compose(
  withTheme,
  setDefaultProps,
  getType,
  setTypeProps,
  emphasized,
  outline,
  hoc
)(Base)
