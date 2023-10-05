import { useEffect, useState } from 'react';

export function useFormCheckout() {
  const [form, setForm] = useState<any>({
    username: '',
    notelp: '',
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
  } else if (form.notelp === '') {
    nameFor = 'Harap diisi nomernya';
  } else if (form.email === '') {
    nameFor = 'Harap diisi emailnya';
  }

  return { nameFor, form, setForm, handleChangeForm };
}

export function useFormBank() {
  const [nameBank, setNameBank] = useState<any>({
    accountName: '',
    accountNumber: '',
  });

  function handleChangeBank(e: any) {
    setNameBank({
      ...nameBank,
      [e.target.name]: e.target.value,
    });
  }

  let bankFor = '';
  if (nameBank.accountName === '') {
    bankFor = 'Harap diisi nama rekening bank nya';
  } else if (nameBank.accountNumber === '') {
    bankFor = 'Harap diisi nomer rekening bank nya';
  }

  return { bankFor, nameBank, setNameBank, handleChangeBank };
}

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

interface IPostalCode {
  id: string;
  name: string;
  country_name: string;
  country_code: string;
  administrative_division_level_1_name: string;
  administrative_division_level_1_type: string;
  administrative_division_level_2_name: string;
  administrative_division_level_2_type: string;
  administrative_division_level_3_name: string;
  administrative_division_level_3_type: string;
  postal_code: number;
}

export default function AboutDashboard(item: any, count: number) {
  const data = item;
  const getItems = [
    {
      name: data?.name,
      description: data?.description,
      value:
        data?.variants[0]?.variantOptions[0]?.variantOptionValues[0]?.price,
      length: data?.length,
      width: data?.width,
      height: data?.height,
      weight:
        data?.variants[0]?.variantOptions[0]?.variantOptionValues[0]?.weight,
      // length: 10,
      // width: 10,
      // height: 10,
      // weight: 200,
      quantity: count,
    },
  ];

  console.log('getItems :', getItems);

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

  // interface Courier {
  //   courier_service_name: string;
  //   description: string;
  //   duration: string;
  //   price: number;
  // }

  const [provinceOption, setProvinceOption] = useState<Provinsi[]>([]);
  const [districtOption, setDistrictOption] = useState<Kabupaten[]>([]);
  const [regionOption, setRegionOption] = useState<Kecmatan[]>([]);
  const [courierServiceOption, setCourierServiceOption] = useState<
    CourierService[]
  >([]);
  const [postalCode, setPostalCode] = useState<IPostalCode[]>([]);
  const [courierSelected, setCourierSelected] = useState('');

  const [dataRates, setDataRates] = useState({
    province: '',
    district: '',
    region: '',
    postalCode: '',
    id: '',
  });

  // console.log("dataRates :", dataRates);

  const fetchProvinceData = async () => {
    try {
      const response = await fetch(
        'https://api.binderbyte.com/wilayah/provinsi?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd'
      );
      const data = await response.json();
      if (data.code === '200') {
        setProvinceOption(data.value);
      }
    } catch (error) {
      console.error('Error fetching provinsi data:', error);
    }
  };

  const fetchDistrictData = async (id: any) => {
    try {
      const response = await fetch(
        `https://api.binderbyte.com/wilayah/kabupaten?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd&id_provinsi=${id}`
      );
      const data = await response.json();
      if (response.ok) {
        setDistrictOption(data.value);
      }
    } catch (error) {
      console.error('Error fetching kabupaten data:', error);
    }
  };

  const fetchRegionData = async (id: any) => {
    try {
      const response = await fetch(
        `https://api.binderbyte.com/wilayah/kecamatan?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd&id_kabupaten=${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setRegionOption(data.value);
      }
    } catch (error) {
      console.error('Error fetching kecamatan data:', error);
    }
  };

  const handleChangeProvince = (e: any) => {
    const id = e.split(',')[0];
    const name = e.split(',')[1];

    setDataRates({
      ...dataRates,
      province: name,
    });
    fetchDistrictData(id);
  };

  const handleChangeDistrict = (e: any) => {
    const id = e.split(',')[0];
    const name = e.split(',')[1];

    setDataRates({
      ...dataRates,
      district: name,
    });
    fetchRegionData(id);
  };

  const handleChangeRegion = (e: any) => {
    // const id = e.split(",")[0];
    const name = e.split(',')[1];

    setDataRates({
      ...dataRates,
      region: name,
    });
    // console.log("kecamatan berubah", name);
  };

  const handleChangePostalCode = (e: any) => {
    setDataRates({
      ...dataRates,
      postalCode: e,
    });
  };

  useEffect(() => {
    handleChangeArea();
  }, [dataRates]);

  const handleChangeArea = async () => {
    try {
      const response = await fetch(
        `https://api.biteship.com/v1/maps/areas?countries=ID&input=${dataRates.district}+,+${dataRates.region}&type=single`,
        {
          headers: {
            authorization:
              'biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYml0ZXNoaXAiLCJ1c2VySWQiOiI2NGY5OGJlN2EyNTA0MDQ1YzQ1MjE5NWIiLCJpYXQiOjE2OTQyNDk2NjN9.5RjX5-q_h2ipwLi0Us5Mhj6tlm-GGVxWNtoZLan06Ro',
            'content-type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      // console.log("data  : ", data);

      if (!data || !data.areas || !Array.isArray(data.areas)) {
        throw new Error('API response is missing expected data');
      }

      const filteredData = data.areas
        // .filter((area: any) => {
        //   const kecamatan = area.name.split(",")[0];
        //   return kecamatan === dataRates.region;
        // })
        .map((area: any) => {
          // const nameParts = area.name.split(",");
          // const kecamatan = nameParts[0].trim();
          return {
            ...area,
            // kecamatan,
          };
        });

      setPostalCode(filteredData);

      if (filteredData.length > 0) {
        dataRates.id = filteredData[0].id;
        // dataRates.postalCode = filteredData[0].postal_code;
        // console.log("Filtered Data:", filteredData);
        // console.log("ID: ", dataRates.id);
        // console.log("Postal Code: ", dataRates.postalCode);
      } else {
        console.log('No data found for the selected kecamatan.');
      }
    } catch (error) {
      console.error('Error fetching kecamatan data:', error);
    }
  };

  const handleChangeCourier = async (e: any) => {
    // console.log(dataRates.postalCode);
    // console.log(" courier", e);

    setCourierSelected(e);

    const requestBody = {
      // origin_area_id: "IDNP6IDNC148IDND841IDZ12740",
      // destination_area_id: dataRates.id,
      origin_postal_code: 15516,
      destination_postal_code: parseInt(dataRates.postalCode),
      couriers: e,
      items: getItems,
    };

    try {
      const response = await fetch(
        'https://api.biteship.com/v1/rates/couriers',
        {
          method: 'POST',
          headers: {
            authorization:
              'biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYml0ZXNoaXAiLCJ1c2VySWQiOiI2NGY5OGJlN2EyNTA0MDQ1YzQ1MjE5NWIiLCJpYXQiOjE2OTQyNDk2NjN9.5RjX5-q_h2ipwLi0Us5Mhj6tlm-GGVxWNtoZLan06Ro', // Replace with your API key
            'content-type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setCourierServiceOption(data.pricing);
    } catch (error) {
      console.error('Error calculating shipping cost:', error);
    }
  };

  useEffect(() => {
    fetchProvinceData();
  }, []);
  const [rates, setRates] = useState('');

  const handleRatesChange = (event: any) => {
    setRates(event.target.value);
  };

  let coment = '';

  if (dataRates.province === '') {
    coment = 'Harap pilih Provinsi';
  } else if (dataRates.district === '') {
    coment = 'Harap pilih Kota/Kabupaten';
  } else if (dataRates.region === '') {
    coment = 'Harap pilih Kecamatan';
  } else if (dataRates.postalCode === '') {
    coment = 'Harap pilih Kode pos';
  } else if (courierSelected === '') {
    coment = 'Harap pilih Metode Pembayaran';
  } else if (rates === '') {
    coment = 'Harap pilih Ongkos kirim';
  }

  return {
    coment,
    provinceOption,
    districtOption,
    regionOption,
    setDataRates,
    dataRates,
    rates,
    dataCourier,
    handleRatesChange,
    postalCode,
    courierServiceOption,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeRegion,
    handleChangeCourier,
    handleChangePostalCode,
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

export function useVariant() {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleRadioChange = (e: any) => {
    const value = e.target.value;
    const valueInt = parseInt(value);

    setSelectedOption(valueInt);
  };
  return {
    selectedOption,
    setSelectedOption,
    handleRadioChange,
  };
}
