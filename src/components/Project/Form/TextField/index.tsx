import { InputHTMLAttributes } from 'react';
import { Container, Content, InputContainer } from './styles';
import { IconBaseProps } from 'react-icons';
import {
  UseFormMethods,
  SubmitHandler,
  useForm,
  useFormContext
} from 'react-hook-form';
import Tooltip from '../../../Tooltip';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import React from 'react';
import { BiText } from 'react-icons/bi';

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
