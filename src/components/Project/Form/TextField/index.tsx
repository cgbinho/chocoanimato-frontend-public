import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BiText } from 'react-icons/bi';
import Tooltip from '../../../Tooltip';
import { Container, Content, InputContainer } from './styles';

const TextField = ({ field, handleChangeField }) => {
  const {
    id,
    text,
    fieldname,
    section,
    category,
    propPath,
    value,
    toolTip
  } = field;

  const {
    register,
    errors,
    getValues,
    setValue,
    reset,
    control
  } = useFormContext(); // retrieve all hook methods

  return (
    <Container>
      <label htmlFor={fieldname}>{text}</label>
      <Content>
        <InputContainer>
          <BiText size={20} />
          <input
            name={fieldname}
            type="text"
            ref={register}
            onChange={e =>
              handleChangeField({
                [fieldname]: e.target.value
              })
            }
          />
        </InputContainer>
        {toolTip && <Tooltip message={toolTip} />}
      </Content>
      {errors && errors[fieldname] && <p>{errors[fieldname]?.message}</p>}
      {/* <hr /> */}
    </Container>
  );
};

export default TextField;
