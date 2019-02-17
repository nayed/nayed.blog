import styled from 'styled-components'

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

export { Checkbox, Label }
