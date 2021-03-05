import { useEffect, useState } from 'react';
import cardValidation from 'card-validator';

const useCardBrand = (cardNumber: string) => {
  const [cardBrand, setCardBrand] = useState({
    card: {
      niceType: 'Cartão',
      type: 'nomeDoCartão'
    }
  });

  useEffect(() => {
    if (cardNumber.length > 12) {
      const card = cardValidation.number(cardNumber);
      setCardBrand(card);
    }
  }, [cardNumber]);

  return cardBrand;
};

export default useCardBrand;
