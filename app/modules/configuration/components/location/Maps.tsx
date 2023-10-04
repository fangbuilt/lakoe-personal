import { Box, Center, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Maps() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    // Fungsi untuk inisialisasi Google Maps API dan Autocomplete
    const initializeMap = () => {
      let map: google.maps.Map;
      let marker: google.maps.Marker | null = null;
      let autocomplete: google.maps.places.Autocomplete;

      // Inisialisasi peta
      map = new google.maps.Map(document.getElementById('map')!, {
        center: { lat: -7.797068, lng: 110.370529 },
        zoom: 15,
      });

      // Inisialisasi Autocomplete
      const autocompleteInput = document.getElementById(
        'autocomplete'
      ) as HTMLInputElement;
      autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {});

      // Tambahkan event listener untuk mengambil koordinat saat memilih alamat dari autocomplete
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (place.geometry && place.geometry.location) {
          const location = place.geometry.location;
          const newLatitude = location.lat();
          const newLongitude = location.lng();

          // Update state dengan latitude dan longitude baru
          setLatitude(newLatitude);
          setLongitude(newLongitude);

          // Geser peta ke lokasi yang baru dipilih
          map.panTo(location);

          // Hapus marker sebelumnya jika ada
          if (marker) {
            marker.setMap(null);
          }

          // Buat marker baru di lokasi yang baru dipilih
          marker = new google.maps.Marker({
            position: location,
            map: map,
            title: 'Lokasi Anda',
          });

          // Tampilkan latitude dan longitude di konsol
          console.log('Latitude:', newLatitude);
          console.log('Longitude:', newLongitude);
        }
      });

      console.log(autocomplete, 'atc');
    };

    // Buat elemen <script> untuk memuat pustaka Google Maps API
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBoh3wL5LQnixnbEAD3dJ4zlX0_hPBZR7s&libraries=places`;
    googleMapScript.async = true;

    // Tambahkan event listener untuk menangani saat pustaka Google Maps selesai dimuat
    googleMapScript.onload = initializeMap;

    // Tambahkan elemen <script> ke dalam body dokumen
    document.body.appendChild(googleMapScript);
  }, []);
  function handlekeypress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }
  return (
    <Center>
      <Box p={2} border={'1px solid #eaeaea'} borderRadius={'10px'}>
        <Input
          p={3}
          w={'100%'}
          id="autocomplete"
          type="text"
          placeholder="Cari alamat..."
          mb={'10px'}
          onKeyDown={handlekeypress}
          required
        />
        <Box id="map" style={{ height: '300px', width: '400px' }}></Box>
        {latitude !== null && longitude !== null && (
          <Box width={'400px'}>
            {/* <Text>Latitude: {latitude}</Text>
            <Text>Longitude: {longitude}</Text> */}
            <Input name="latitude" hidden type="text" value={latitude} />
            <Input name="longtitude" hidden type="text" value={longitude} />
          </Box>
        )}
      </Box>
    </Center>
  );
}
