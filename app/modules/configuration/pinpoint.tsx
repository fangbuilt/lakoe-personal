import { Box, Center, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

function Map() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    let map: google.maps.Map;
    let marker: google.maps.Marker | null = null;
    let autocomplete: google.maps.places.Autocomplete;

    // Buat elemen <script> untuk memuat pustaka Google Maps API
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBoh3wL5LQnixnbEAD3dJ4zlX0_hPBZR7s&libraries=places`;
    googleMapScript.async = true;

    // Tambahkan event listener untuk menangani saat pustaka Google Maps selesai dimuat
    googleMapScript.onload = () => {
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
    };

    // Tambahkan elemen <script> ke dalam body dokumen
    document.body.appendChild(googleMapScript);
  }, []);

  return (
    <Center m={3}>
      <Box>
        <Input
          p={3}
          w={'100%'}
          id="autocomplete"
          type="text"
          placeholder="Cari alamat..."
          style={{ margin: '10px' }}
        />
        <Box id="map" style={{ height: '300px', width: '500px' }}></Box>
        {latitude !== null && longitude !== null && (
          <Box>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
          </Box>
        )}
      </Box>
    </Center>
  );
}

export default Map;
