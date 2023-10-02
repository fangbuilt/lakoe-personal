import { useEffect, useState } from 'react';

export function useFormCheckout() {
  const [form, setForm] = useState<any>({
    username: '',
    notelp: 0,
    email: '',
  });

  function handleChangeForm(e: any) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  let nameFor = '';

  if (form.username === '') {
    nameFor = 'Harap diisi namanya';
  } else if (form.notelp === 0) {
    nameFor = 'Harap diisi nomernya';
  } else if (form.email === '') {
    nameFor = 'Harap diisi emailnya';
  }

  return { nameFor, form, setForm, handleChangeForm };
}

export function useDistrict() {
  interface Provinsi {
    id: string;
    name: string;
  }

  interface Kabupaten {
    id: string;
    name: string;
  }
  interface Kecmatan {
    id: string;
    name: string;
  }

  // Deklarasikan state untuk menyimpan data provinsi
  const [provinsiOption, setProvinsiOption] = useState<Provinsi[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedProvinceName, setSelectedProvinceName] = useState('');

  const [kabupatenOption, setKabupatenOption] = useState<Kabupaten[]>([]);
  const [selectedKabupaten, setSelectedKabupaten] = useState('');
  const [selectedKabupatenName, setSelectedKabupatenName] = useState('');

  const [kecamatanOption, setKecamatanOption] = useState<Kecmatan[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [selectedKecamatanName, setSelectedKecamatanName] = useState('');

  const fetchProvinsiData = async () => {
    try {
      const response = await fetch(
        'https://api.binderbyte.com/wilayah/provinsi?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd'
      );

      const data = await response.json();
      setProvinsiOption(data.value);
    } catch (error) {
      console.error('Error fetching provinsi data:', error);
    }
  };

  const fetchKabupatenData = async () => {
    try {
      const id = selectedProvince.split(',')[0];
      const name = selectedProvince.split(',')[1];
      setSelectedProvinceName(name);

      const response = await fetch(
        `https://api.binderbyte.com/wilayah/kabupaten?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd&id_provinsi=${id}`
      );
      if (response.ok) {
        const data = await response.json();

        setKabupatenOption(data.value);
      }
    } catch (error) {
      console.error('Error fetching kabupaten data:', error);
    }
  };

  const fetchKecamatanData = async () => {
    try {
      const id = selectedKabupaten.split(',')[0];
      const name = selectedKabupaten.split(',')[1];
      setSelectedKabupatenName(name);

      const response = await fetch(
        `https://api.binderbyte.com/wilayah/kecamatan?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd&id_kabupaten=${id}`
      );
      if (response.ok) {
        const data = await response.json();

        setKecamatanOption(data.value);
      }
    } catch (error) {
      console.error('Error fetching kecamatan data:', error);
    }
  };

  useEffect(() => {
    fetchProvinsiData();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetchKabupatenData();
    } else {
      setKabupatenOption([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedKabupaten) {
      fetchKecamatanData();
    } else {
      setKecamatanOption([]);
    }
  }, [selectedKabupaten]);

  // const handlePostalCodeChange = (event: any) => {
  //   setPostalCode(event.target.value);
  // };

  // const handleRatesChange = (event: any) => {
  //   setRates(event.target.value);
  // };

  const handleProvinceChange = (event: any) => {
    setSelectedProvince(event.target.value);
  };

  const handleKabupatenChange = (event: any) => {
    setSelectedKabupaten(event.target.value);
  };

  const handleKecamatanChange = (event: any) => {
    setSelectedKecamatan(event.target.value);
    setSelectedKecamatanName(event.target.value.split(',')[1]);
  };

  let coment = '';

  if (selectedProvince === '') {
    coment = 'Harap pilih Provinsi';
  } else if (selectedKabupaten === '') {
    coment = 'Harap pilih Kabupaten';
  } else if (selectedKecamatan === '') {
    coment = 'Harap pilih Kecamatan';
  }

  return {
    coment,
    provinsiOption,
    selectedProvince,
    selectedProvinceName,
    kabupatenOption,
    selectedKabupaten,
    selectedKabupatenName,
    kecamatanOption,
    selectedKecamatan,
    selectedKecamatanName,
    handleProvinceChange,
    handleKabupatenChange,
    handleKecamatanChange,
  };
}

export function useCounter(limit: number) {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleChange = (e: any) => {
    setCount(e.target.value);
  };

  if (count < 0) {
    setCount(0);
  } else if (count > limit) {
    setCount(limit);
  }
  return {
    count,
    setCount,
    handleIncrement,
    handleDecrement,
    handleChange,
  };
}

export function useCourier() {
  const dataCourier = ['jne', 'tiki', 'sicepat', 'jnt', 'pos', 'anteraja'];
  interface CourierService {
    available_for_cash_on_delivery: true;
    available_for_proof_of_delivery: false;
    available_for_instant_waybill_id: true;
    available_for_insurance: true;
    company: string;
    courier_name: string;
    courier_code: string;
    courier_service_name: string;
    courier_service_code: string;
    description: string;
    duration: string;
    shipment_duration_range: string;
    shipment_duration_unit: string;
    service_type: string;
    shipping_type: string;
    price: number;
    type: string;
  }

  const [rates, setRates] = useState('');

  const [dataRates, setDataRates] = useState({
    postalCode: '',
  });
  const [postalCode, setPostalCode] = useState();
  const [courierService, setCourierService] = useState<CourierService[]>([]);
  const [courierServiceSelected, setCourierServiceSelected] = useState('');
  const [ratesSelected, setRatesSelected] = useState({});

  const courierType = courierService.find(
    (item) => item.price === parseInt(rates)
  );

  // console.log("coba", courierType);

  // console.log("courierService", courierService);
  // console.log("courierServiceSelected", courierServiceSelected);
  // console.log("rates", rates);
  // console.log("ratesSelected", ratesSelected);

  const handleChangeCourier = async (e: any) => {
    setCourierServiceSelected(e);
    const requestBody = {
      origin_postal_code: 12740,
      destination_postal_code: parseInt(dataRates.postalCode),
      couriers: e,
      items: [
        {
          name: 'Shoes',
          description: 'Black colored size 45',
          value: 199000,
          length: 10,
          width: 10,
          height: 10,
          weight: 200,
          quantity: 2,
        },
      ],
    };

    try {
      const response = await fetch(
        'https://api.biteship.com/v1/rates/couriers',
        {
          method: 'POST',
          headers: {
            authorization:
              'biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYml0ZXNoaXAiLCJ1c2VySWQiOiI2NGY5OGJlN2EyNTA0MDQ1YzQ1MjE5NWIiLCJpYXQiOjE2OTQyNDk2NjN9.5RjX5-q_h2ipwLi0Us5Mhj6tlm-GGVxWNtoZLan06Ro',
            'content-type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setCourierService(data.pricing);
    } catch (error) {
      console.error('Error calculating shipping cost:', error);
    }
  };

  const handlePostalCodeChange = (event: any) => {
    setPostalCode(event.target.value);
  };

  const handleRatesChange = (event: any) => {
    setRates(event.target.value);
    setRatesSelected(event);
  };

  return {
    ratesSelected,
    handlePostalCodeChange,
    courierType,
    postalCode,
    handleRatesChange,
    rates,
    setRates,
    courierServiceSelected,
    dataCourier,
    courierService,
    dataRates,
    setDataRates,
    handleChangeCourier,
  };
}

export function useVariant() {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valueInt = parseInt(value);
    setSelectedOption(valueInt);
  };
  return {
    selectedOption,
    handleRadioChange,
  };
}
