import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Product } from '~/interfaces/product';

export default function useAddProduct() {
  const [previews, setPreviews] = useState<(string | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  const [form, setForm] = useState<Product>({
    name: '',
    url: '',
    category: '',
    description: '',
    attachments: [],
    variant: '',
    price: 0,
    minimumOrder: 0,
    stock: 0,
    sku: '',
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
  });

  const [description, setDescription] = useState('');
  const maxCharacters = 3000;

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    if (event.target.type === 'file') {
      console.log('event.target.type:', event.target.type);

      const files = value as Object;

      console.log('files:', files);

      if (!files) return;

      const mediaFile = files as MediaSource | Blob;
      console.log('mediaFile:', mediaFile);
      const newPreviews = [...previews];
      const index = Number(name.split('_')[1]);

      newPreviews[index] = URL.createObjectURL(mediaFile);
      setPreviews(newPreviews);

      setForm({
        ...form,
        [name]: mediaFile,
      });
    } else if (name === 'description') {
      const descValue = event.target.value;

      if (descValue.length <= maxCharacters) {
        setDescription(descValue);
      }

      setForm({
        ...form,
        [name]: value,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  function cancelPreview(index: number) {
    const newPreviews = [...previews];
    newPreviews[index] = undefined;
    setForm({
      ...form,
      attachments: [],
    });
    setPreviews(newPreviews);
  }

  return { previews, handleChange, cancelPreview, description, maxCharacters };
}
