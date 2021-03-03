export const CpfSanitization = (value: string): string => {
  const data = value.replace(/\./g, '').replace(/-/g, '').replace(/\D/g, '');
  return data;
};

export const cepSanitization = (value: string): string => {
  try {
    const data = value.replace(/\.|\-/g, '').replace(/\D/g, '');
    return data;
  } catch (error) {
    return '';
  }
};
