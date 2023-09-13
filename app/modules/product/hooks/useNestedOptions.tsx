import { useState } from 'react';

export default function useNestedOptions() {
  const [selected, setSelected] = useState(null);

  const options = [
    {
      label: 'Audio, Kamera, dan Elektronik Lainnya',
      children: [
        {
          label: 'Aksesoris Kamera',
          children: [
            { label: 'Kabel Konektor Kamera' },
            { label: 'Lainnya' },
            { label: 'Microphone Kamera' },
            { label: 'Monopod Kamera' },
            { label: 'Remote Wireless Kamera' },
            { label: 'Silica Gel Kamera' },
            { label: 'Stabilizer Kamera' },
            { label: 'Monopod Kamera' },
          ],
        },
        {
          label: 'Audio',
          children: [
            { label: 'Amplifier' },
            { label: 'Earphone' },
            { label: 'Headphone' },
            { label: 'Kabel dan Konektor Audio' },
            { label: 'Sound System' },
            { label: 'Speaker' },
            { label: 'TWS' },
            { label: 'Voice Recorder' },
          ],
        },
        {
          label: 'Baterai dan Charger Kamera',
          children: [
            { label: 'Baterai Kamera' },
            { label: 'Baterai dan Charger Pack' },
            { label: 'Baterai Grip Kamera' },
            { label: 'Charger Kamera' },
          ],
        },
        {
          label: 'Cleaning Tools Kamera',
          children: [
            { label: 'Cleaning Cloth and Wipe' },
            { label: 'Cleaning Kit Kamera' },
            { label: 'Baterai Grip Kamera' },
            { label: 'Cleaning Swab' },
            { label: 'Dry Box Kamera' },
            { label: 'Lenspen' },
            { label: 'Rubber Dust Air Blower' },
          ],
        },
        {
          label: 'Drone dan Aksesoris',
          children: [
            { label: 'Aksesoris Drone' },
            { label: 'Drone Kamera' },
            { label: 'Drone Remote Control' },
            { label: 'Tas Drone' },
          ],
        },
        {
          label: 'Frame, Album, dan Roll Film',
          children: [
            { label: 'Album Foto' },
            { label: 'DVs' },
            { label: 'Frame Digital' },
            { label: 'Frame Foto' },
            { label: 'Printer Foto' },
            { label: 'Printer Foto Portable' },
            { label: 'Refill Kamera Instan' },
            { label: 'Roll Film' },
          ],
        },
        {
          label: 'Kamera Digital',
          children: [
            { label: 'Kamera Action' },
            { label: 'Kamera 360' },
            { label: 'Kamera DSLR' },
            { label: 'Kamera Mirrorless' },
            { label: 'Kamera Pocket' },
          ],
        },
        {
          label: 'Lensa dan Aksesoris',
          children: [
            { label: 'Adapter Lensa' },
            { label: 'Cap Lensa Kamera' },
            { label: 'Converter - Teleconverter' },
            { label: 'Filter Lensa Kamera' },
            { label: 'Hood Lensa Kamera' },
            { label: 'Pouch Lensa' },
            { label: 'Lensa Kamaera' },
          ],
        },
        {
          label: 'Lighting dan Studio',
          children: [
            { label: 'Backdrop' },
            { label: 'Flash Diffuser' },
            { label: 'Flash Kamera' },
            { label: 'Flash Trigger' },
            { label: 'Hot Shoe Kamera' },
            { label: 'RIng Light' },
            { label: 'Softbox' },
          ],
        },
        {
          label: 'Media Player',
          children: [
            { label: 'Blu Ray Player' },
            { label: 'DVD Player' },
            { label: 'MP3 and MP4 Player' },
            { label: 'Radio and Tape Player' },
          ],
        },
        {
          label: 'Perangkat Elektronik Lainnya',
          children: [{ label: 'Lainnya' }],
        },
        {
          label: 'Tas dan Case Kamera',
          children: [
            { label: 'Case Kamera' },
            { label: 'Strap Kamera' },
            { label: 'Tas Ransel Kamera' },
            { label: 'Tas Selempang Kamera' },
            { label: 'Waterproof Case Kamera' },
          ],
        },
        {
          label: 'Video',
          children: [{ label: 'Camcorder' }],
        },
      ],
    },
    {
      label: 'Buku',
      children: [
        {
          label: 'Arsitektur dan Desain',
          children: [{ label: 'Buku Bangunan' }],
        },
      ],
    },
  ];

  // const handleOptionChange = (event: any) => {
  //   setSelected(event.target.value)
  // }

  return { selected, setSelected, options };
}
