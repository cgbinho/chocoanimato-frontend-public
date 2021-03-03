import React, { useCallback, useEffect, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { BiImageAdd, BiUpload } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useProjectAsset } from '../../../../hooks/projects';
import { ButtonWithIcon, SpinnerContainer } from '../../../Form/Button/styles';
import Tooltip from '../../../Tooltip';
import ColorField from '../ColorField';
import SwitchField from '../SwitchField';
import {
  Container,
  Content,
  DropzoneContainer,
  DropzoneContent,
  RemoveImageContainer
} from './styles';

const ImageField = props => {
  const { field, handleChangeField, project } = props;
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

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [alphaRequired, setAlphaRequired] = useState(false);
  const [alphaColor, setAlphaColor] = useState('255,255,255,1');

  const { register, unregister, setValue, watch, errors } = useFormContext();

  // fetch image preview from api:
  const {
    isLoading: isLoadingImage,
    error,
    data: defaultImage
  } = useProjectAsset({
    id: project.id,
    filename: value
  });

  // Updates the image preview if a new file is uploaded.
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(defaultImage);
    }
  }, [imageFile, defaultImage]);

  const onDropAccepted = useCallback<DropzoneOptions['onDropAccepted']>(
    droppedFiles => {
      // add image to input value:
      setValue(fieldname, droppedFiles, { shouldValidate: true });
      setImageFile(droppedFiles[0]);
      setImagePreview(droppedFiles[0]);
      // updates the value and trigger the useProjectAsset:
      // handleChangeField({ [fieldname]: droppedFiles[0] });
    },
    [setValue, fieldname]
  );

  const onDropRejected = useCallback<DropzoneOptions['onDropRejected']>(
    droppedFiles => {},
    []
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: 'image/png, image/jpg, image/jpeg, image/gif'
  });

  // Register Field
  useEffect(() => {
    register(fieldname);
    register(`${fieldname}_isAlphaRequired`);
    register(`${fieldname}_alphaColor`);
    return () => {
      unregister(`${fieldname}_isAlphaRequired`);
      unregister(`${fieldname}_alphaColor`);
      unregister(fieldname);
    };
  }, [register, unregister, fieldname]);

  const handleAlphaColor = data => {
    setAlphaColor(data[`${fieldname}_alphaColor`]);
  };

  const handleImageSubmit = () => {
    handleChangeField({
      [fieldname]: imageFile,
      [`${fieldname}_isAlphaRequired`]: alphaRequired,
      [`${fieldname}_alphaColor`]: alphaColor
    });
    setAlphaRequired(false);
    setImageFile(null);
  };

  // Filtrar esse field lá no backend e tratar imagem ou transparencia na ausencia de imagem.
  const handleRemoveImage = () => {
    handleChangeField({
      removeImageFromField: fieldname
    });
  };

  const imageIsAlphaRequiredField = {
    id,
    text: 'Gerar Fundo Transparente?',
    fieldname: `${fieldname}_isAlphaRequired`,
    section,
    category,
    propPath,
    value: false,
    toolTip: 'Habilita a criação de uma imagem com fundo transparente'
  };

  const imageAlphaColorField = {
    id,
    text: 'Cor de transparência',
    fieldname: `${fieldname}_alphaColor`,
    section,
    category,
    propPath,
    value: '255,255,255,1',
    toolTip: 'Escolha a cor de fundo da sua imagem.'
  };

  return (
    <Container>
      <label htmlFor={fieldname}>{text}</label>
      <Content>
        <DropzoneContainer
          {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        >
          <input id={fieldname} {...getInputProps()} />
          <DropzoneContent preview={imagePreview} isDragActive={isDragActive}>
            <BiImageAdd size={24} />
            <RenderDragMessage
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            />
            {/* <img src={defaultImage} alt={'Arraste imagem para fazer o upload'} /> */}
          </DropzoneContent>
        </DropzoneContainer>

        <RemoveImageContainer onClick={handleRemoveImage}>
          <MdDelete size={24} />
          <span>Remover</span>
        </RemoveImageContainer>

        {toolTip && <Tooltip message={toolTip} />}
      </Content>
      {errors[fieldname] && <p>{errors[fieldname]?.message}</p>}
      {imageFile && (
        <>
          <div className="alpha_required">
            <SwitchField
              field={imageIsAlphaRequiredField}
              setAlphaRequired={setAlphaRequired}
              alphaRequired={alphaRequired}
            />
            {alphaRequired && (
              <ColorField
                field={imageAlphaColorField}
                handleChangeField={handleAlphaColor}
                pickColorText={
                  'Clique aqui para escolher a cor de transparência'
                }
              />
            )}
          </div>

          <ButtonWithIcon
            type="button"
            width="100%"
            onClick={handleImageSubmit}
            primary
          >
            {!isLoadingImage ? (
              <>
                <BiUpload size={18} />
                Enviar a Imagem
              </>
            ) : (
              <SpinnerContainer></SpinnerContainer>
            )}
          </ButtonWithIcon>
        </>
      )}
    </Container>
  );
};

const RenderDragMessage = ({ isDragActive, isDragReject }) => {
  if (!isDragActive) {
    return (
      <>
        {/* image thumb */}
        <span>Clique ou arraste para adicionar uma imagem</span>
      </>
    );
  }
  if (isDragReject) {
    return <span>Arquivo não suportado</span>;
  }

  if (isDragActive) {
    return (
      <>
        <span>Solte a imagem aqui</span>
      </>
    );
  }

  return <span>Para trocar de imagem, clique ou arraste ela aqui</span>;
};

export default ImageField;
