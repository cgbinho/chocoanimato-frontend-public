import { BsPhone, BsPhoneLandscape } from 'react-icons/bs';
import { FiClock, FiFilm } from 'react-icons/fi';
import { TagContainer, TagsContainer } from './styles';

const Tag = ({ icon: Icon, value }) => {
  return (
    <TagContainer>
      <Icon size={20} />
      <label>{value}</label>
    </TagContainer>
  );
};

interface IProps {
  tags: ITags;
  margin: string;
}

interface ITags {
  category: string[];
  ratio: string;
  duration: number;
}

const TemplateTags = ({ tags, margin }: IProps) => {
  const { category, ratio, duration } = tags;

  const isLandscape = ratio === 'landscape' ? true : false;

  return (
    <TagsContainer margin={margin}>
      <Tag value={category} icon={FiFilm} />
      <Tag value={`${duration} segundos`} icon={FiClock} />
      {isLandscape ? (
        <Tag value={ratio} icon={BsPhoneLandscape} />
      ) : (
        <Tag value={ratio} icon={BsPhone} />
      )}
    </TagsContainer>
  );
};

export default TemplateTags;
