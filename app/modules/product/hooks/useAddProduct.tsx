import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Product } from '~/interfaces/Product';

export default function useAddProduct() {
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState<Product>({
    name: '',
    url: '',
    category: '',
    description: '',
    image: '',
    variant: '',
    price: 0,
    min_order: 0,
    stock: 0,
    sku: '',
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
  });

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;
    // console.log("1", name, value)
    if (event.target.type === 'file') {
      // console.log("2", event.target.type)
      const eventFile = event.target as HTMLInputElement;
      const files = eventFile.value as Object;
      // console.log("3", files)
      if (!files) return;

      setForm({
        ...form,
        [name]: files,
      });

      const mediaFile = files as MediaSource | Blob;

      setPreview(URL.createObjectURL(mediaFile));
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  function cancelPreview() {
    setForm({
      ...form,
      image: '',
    });
    setPreview(null);
  }

  return { preview, handleChange, cancelPreview };
}
