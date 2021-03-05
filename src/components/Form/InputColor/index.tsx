import React, { InputHTMLAttributes, useState } from 'react';
import {
  Container,
  Content,
  InputContainer,
  HiddenInputContainer
} from './styles';

import { CgColorPicker } from 'react-icons/cg';
import {
  UseFormMethods,
  SubmitHandler,
  useForm,
  Controller,
  useFormContext
} from 'react-hook-form';
import Tooltip from '../../Tooltip';
import { ColorChangeHandler, ColorResult, SketchPicker } from 'react-color';

interface InputColorProps {
  name: string;
  label?: string;
  tooltip?: string;
}

const InputColor: React.FC<InputColorProps> = props => {
  const { name, label, tooltip } = props;

  const [colorInput, setColorInput] = useState('');
  const [colorCSS, setColorCSS] = useState();

  const handleChangeComplete: ColorChangeHandler = (c: ColorResult) => {
    setColorInput(rgbaObjToString(c.rgb));
    // setValue('color_primary', colorInput);
    // setColorCSS(c.hex);
    // setColorInput(colorToString(c.rgb));
    // setValue(name, setColorInput(colorToString(c.rgb)));
  };

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      {/* <Content>
        <InputContainer
          color={colorCSS}
          textColor={pickTextColorBasedOnBgColorAdvanced(
            colorCSS,
            'white',
            'black'
          )}
        >
          <button type="button">
            <CgColorPicker size={20} />
            <span>Clique aqui para escolher a cor</span>
          </button>
        </InputContainer>
        {tooltip && <Tooltip message={tooltip} />}
      </Content> */}
      {/* Hidden input to store color value */}
      {/* <input ref={register} name={name} />
      <HiddenInputContainer></HiddenInputContainer>
      <SketchPicker color={colorCSS} onChange={handleChangeComplete} />
      {errors[name] && <p>{errors[name]?.message}</p>} */}
    </Container>
  );
};

export default InputColor;

interface RGBData {
  a?: number;
  b: number;
  g: number;
  r: number;
}

/*
PICK TEXT COLOR WITH BEST CONTRAST BASED ON BACKGROUND COLOR
*/
function pickTextColorBasedOnBgColorAdvanced(
  bgColor: string,
  lightColor: string,
  darkColor: string
): string {
  return darkColor;
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
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
const rgbaObjToString = (data: RGBData): string => {
  return Object.values(data).toString().replace('[', '').replace(']', '');
};

//convert color string to object:
const rgbaStringToObj = (data: string): RGBData => {
  let colorParsed = data.split(',');

  return {
    r: Number(colorParsed[0]),
    g: Number(colorParsed[1]),
    b: Number(colorParsed[2]),
    a: Number(colorParsed[3])
  };
};
