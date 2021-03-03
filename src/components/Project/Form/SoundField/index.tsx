import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Plyr from 'react-plyr';
import storageConfig from '../../../../config/storage';
import { useMusic } from '../../../../hooks/music';
import Tooltip from '../../../Tooltip';
import { Container, Content } from './styles';

const SoundField = ({ field, handleChangeField, project }) => {
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

  const [music, setMusic] = useState(value);

  // disk: https://www.chocoanimato.com/public/music/samples/[music_name]/[music].mp3
  const musicUrl = `${
    storageConfig[storageConfig.driver].music
  }/${music}/${music}_sample_${project.template.duration}s.mp3`;

  const { isLoading, error, data: Music } = useMusic();

  return (
    <Container>
      <label htmlFor={fieldname}>{text}</label>
      <Content>
        <select
          name={fieldname}
          ref={register}
          onChange={e => {
            setMusic(e.target.value);
            handleChangeField({ [fieldname]: e.target.value });
          }}
        >
          {isLoading ? (
            <option value={music}>{music}</option>
          ) : (
            <>
              {music.map(musicListItem => (
                <option value={musicListItem.path} key={musicListItem.name}>
                  {musicListItem.name}
                </option>
              ))}
            </>
          )}
        </select>
        {toolTip && <Tooltip message={toolTip} />}
      </Content>
      <Plyr type="audio" url={musicUrl} />
      {errors && errors[fieldname] && <p>{errors[fieldname]?.message}</p>}
    </Container>
  );
};

export default SoundField;
