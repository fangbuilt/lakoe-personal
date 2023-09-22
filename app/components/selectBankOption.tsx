import CreatableSelect from 'react-select/creatable';

const options = [
  { value: 'BCA', label: 'BCA' },
  { value: 'BRI', label: 'BRI' },
  { value: 'MANDIRI', label: 'MANDIRI' },
  { value: 'BNI', label: 'BNI' },
];

export function SelectBankOption() {
  return (
    <CreatableSelect
      name="bank"
      placeholder="Jenis Bank"
      isClearable
      options={options}
    />
  );
}

export function SelectBankOptionUpdate() {
  return (
    <CreatableSelect
      name="updateBankName"
      placeholder="Jenis Bank"
      isClearable
      options={options}
    />
  );
}
