import styled from 'styled-components'

const Checkbox = styled.input`
  height: 0;
  visibility: hidden;
  width: 0;

  &:checked + label {
    background: #fffef8;
  }
  &:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
`

const Label = styled.label`
  background: #a9a9a9;
  border-radius: 1.5rem;
  cursor: pointer;
  display: block;
  height: 1.5rem;
  margin-left: 1.5rem;
  position: relative;
  text-indent: -9999px;
  width: 3.5rem;
  &:after {
    background: #ffffff;
    border-color: #007d84;
    border-radius: 1rem;
    border-style: solid;
    content: '';
    height: 1.4rem;
    left: 5px;
    position: absolute;
    top: 1px;
    transition: 0.4s;
    width: 1.4rem;
  }
`

export { Checkbox, Label }
