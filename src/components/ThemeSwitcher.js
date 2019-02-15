import styled from 'styled-components'

const themes = {
  light: {
    bodyBG: '#fffef8',
    fontColor: '#445566',
    sideTitleColor: '#12355b',
    sideHoverBG: '#e7ecef',
    titleColor: '#cc3355'
  },
  dark: {
    bodyBG: '#21374b',
    fontColor: '#e7dacb',
    sideTitleColor: '#fffef8',
    sideHoverBG: '#0e6caf',
    titleColor: '#ffffff'
  }
}

const Checkbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  &:checked + label {
    background: #0e6caf;
  }
  &:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
`

const Label = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 3.5rem;
  height: 1.5rem;
  margin-left: 1.5rem;
  background: #9eade6;
  display: block;
  border-radius: 1.5rem;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 0.875rem;
    height: 0.875rem;
    background: #fff;
    border-radius: 0.875rem;
    transition: 0.3s;
  }
  &:active:after {
    width: 3.625rem;
  }
`

export { themes, Checkbox, Label }
