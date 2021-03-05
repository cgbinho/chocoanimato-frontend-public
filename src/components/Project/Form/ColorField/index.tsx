import React, { InputHTMLAttributes, useRef, useState } from 'react';
import {
  Container,
  Content,
  InputContainer,
  HiddenInputContainer
} from './styles';

import { CgColorPicker } from 'react-icons/cg';
import { useFormContext } from 'react-hook-form';
import Tooltip from '../../../Tooltip';

import { ColorChangeHandler, ColorResult, SketchPicker } from 'react-color';
import ModalSketchPicker from '../../../../components/ModalSketchPicker';

// 1. defaultValue comes as string '0,62,53,1'
// 2. We convert it to rgba('0,62,53,1'); for styled components.
// 3. We set the defaultValue to the input via setColorInput; its the value we store in db.
// 4. SketchPicker modifies color as rgb object {a:1,b:2,g:3,r:4};
// 5. onChange : we convert it back to string: '0,62,53,1'
// 6. We set the string value to the input via setColorInput.

interface IProps {
  field: any;
  handleChangeField: any;
  pickColorText?: string;
}

const ColorField = ({ field, handleChangeField, pickColorText }: IProps) => {
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

  const defaultStyledValue = `rgba(${value})`;

  const [colorInput, setColorInput] = useState(value);
  const [colorCSS, setColorCSS] = useState(defaultStyledValue);

  // handleColorChange:
  const handleColorChange: ColorChangeHandler = (c: ColorResult) => {
    const colorString = rgbObjToString(c.rgb); // format '0,62,53,1'
    setColorInput(colorString);
    setColorCSS(`rgba(${colorString})`); // format 'rgba('0,62,53,1')' string.
    handleChangeField({ [fieldname]: colorString });
  };

  // POPUP STATE
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Container>
      <label htmlFor={fieldname}>{text}</label>
      <Content>
        <InputContainer
          color={colorCSS}
          textColor={pickTextColorBasedOnBgColorAdvanced(
            colorCSS,
            'white',
            `var(--primary_dark)`
          )}
        >
          <button type="button" onClick={() => setOpen(!isOpen)}>
            <CgColorPicker size={20} />
            <span>
              {pickColorText
                ? pickColorText
                : 'Clique aqui para escolher a cor'}
            </span>
          </button>
        </InputContainer>
        {toolTip && <Tooltip message={toolTip} />}
      </Content>
      {/* Hidden input to store color value */}
      <HiddenInputContainer>
        <input ref={register} name={fieldname} value={colorInput} readOnly />
      </HiddenInputContainer>
      <ModalSketchPicker
        isOpen={isOpen}
        setOpen={setOpen}
        color={colorCSS}
        onChange={handleColorChange}
      />
      {errors[fieldname] && <p>{errors[fieldname]?.message}</p>}
      {/* <hr /> */}
    </Container>
  );
};

export default ColorField;

interface RGBData {
  a?: number;
  b: number;
  g: number;
  r: number;
}

function pickTextColorBasedOnBgColorAdvanced(
  bgColor: string,
  lightColor: string,
  darkColor: string
): string {
  const colorString = bgColor.replace(`rgba(`, '').replace(`)`, '');
  let colorParsed = colorString.split(',');
  const r = parseInt(colorParsed[0]);
  const g = parseInt(colorParsed[1]);
  const b = parseInt(colorParsed[2]);
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map(col => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}

/* SketchPicker accepts the value as object and I store it as array in DB, so I need this:  */
//convert color obj to string:

const rgbObjToString = (data: RGBData) => {
  const a = data.a;
  const b = data.b;
  const g = data.g;
  const r = data.r;
  return `${r},${g},${b},${a}`;
};
