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
      name="bankName"
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

export function SelectRekening({ dataBank }: any) {
  if (!dataBank || dataBank.length === 0) {
    return 'ga dapet bank';
  }

  return (
    <>
      {dataBank.map((data: any) => (
        <CreatableSelect
          key={data.id}
          placeholder="Pilih Rekening Anda"
          options={[
            {
              label: `${data.bank_name} - ${data.name} - ${data.bank_number}`,
              value: `${data.bank_name}-${data.name}-${data.bank_number}`,
            },
          ]}
        />
      ))}
    </>
  );
}
