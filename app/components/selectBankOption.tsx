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

export function SelectRekening({ dataBank }: any) {
  return (
    <div>
      {dataBank.map((data: any) => (
        <CreatableSelect
          key={data.id}
          placeholder="Pilih Rekening Anda"
          options={[
            {
              label: `${data.bank} - ${data.accountName} - ${data.accountNumber}`,
              value: `${data.bank} - ${data.accountName} - ${data.accountNumber}`,
            },
          ]}
        />
      ))}
    </div>
  );
}
