import { Container } from './styles';

import Toggle from 'react-toggle';
import Tooltip from '../../../Tooltip';

const Switch = ({ field, setAlphaRequired, alphaRequired }) => {
  const value = alphaRequired ? 'yes' : 'no';

  return (
    <Container>
      <div className="alphaRequiredContent">
        <p>Gerar fundo transparente? </p>

        <Toggle
          name={field.fieldname}
          checked={alphaRequired}
          value={value}
          onChange={() => setAlphaRequired(!alphaRequired)}
        />
      </div>
      <Tooltip message={field.toolTip} />
    </Container>
  );
};

export default Switch;
