import { TemplateTitleContainer } from './styles';

interface IProps {
  name: string;
  description: string;
}

const TemplateTitle: React.FC<IProps> = ({ name, description }) => {
  return (
    <TemplateTitleContainer>
      <h3>{name}</h3>
      <p>{description}</p>
    </TemplateTitleContainer>
  );
};

export default TemplateTitle;
