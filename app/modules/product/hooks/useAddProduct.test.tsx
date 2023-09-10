import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Product } from '~/interfaces/Product';

export default function useAddProduct() {
  const [previews, setPreviews] = useState<Array<string | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [form, setForm] = useState<Product>({
    name: '',
    url: '',
    category: '',
    description: '',
    attachment_1: '',
    attachment_2: '',
    attachment_3: '',
    attachment_4: '',
    attachment_5: '',
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
    if (event.target.type === 'file') {
      const eventFile = event.target as HTMLInputElement;
      const files = eventFile.files as FileList;
      if (!files) return;

      const index = parseInt(name.replace('attachment_', '')) - 1;

      const updatedPreviews = [...previews];

      updatedPreviews[index] = URL.createObjectURL(files[0]);

      setForm({
        ...form,
        [name]: files[0],
      });

      setPreviews(updatedPreviews);
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  function cancelPreview(index: number) {
    const updatedPreviews = [...previews];
    updatedPreviews[index] = null;
    setForm({
      ...form,
      [`attachment_${index + 1}`]: '',
    });
    setPreviews(updatedPreviews);
  }

  return {
    previews,
    handleChange,
    cancelPreview,
  };
}
