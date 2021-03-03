export const lowerCaseMask = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.value) {
    event.target.value = event.target.value.toLowerCase();
  }
};

// Formatação de dd/mm/aaaa
export const fullDateMask = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.value) {
    event.target.value = event.target.value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1');
  }
};

// Formatação de mm/yyyy
export const monthYearMask = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.value) {
    event.target.value = event.target.value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1');
  }
};

//formata cpf
export const cpfMask = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  event.target.value = value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

/* /^[a-z\d]{5,12}$/i, */

export const telMask = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.value) {
    event.target.value = event.target.value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/^(\d{2})(\d)/g, '($1) $2') //Coloca parênteses em volta dos dois primeiros dígitos
      .replace(/(\d)(\d{4})$/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
  }
};

export const cepMask = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  event.target.value = value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d)(\d{3})$/, '$1-$2'); // Coloca hifen entre o quarto e o quinto dígitos;
};
// export const cepMask = (event: React.ChangeEvent<HTMLInputElement>) => {
//   const { value } = event.target;
//   event.target.value = value
//     .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
//     .replace(/(\d)(\d{3})$/, '$1 $2'); // Coloca espaço entre o quarto e o quinto dígitos;
// };

// máscara para numero de cartão de crédito
export const creditCardMask = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  event.target.value = value
    .replace(/\D/g, '')
    .replace(/^(\d{4})(\d)/g, '$1 $2')
    .replace(/^(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3')
    .replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3 $4');
};

export const cvvMask = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  event.target.value = value.replace(/\D/g, '').replace(/(\d{4})\d+?$/, '$1'); // até 4 dígitos
};
