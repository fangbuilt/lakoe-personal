import { useState } from 'react';

export default function useCopyToClipboard() {
  const toastStyle = {
    zindex: '1',
    width: '400px',
    height: '3em',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    p: '12px',
    position: 'fixed' as const,
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#1D1D1D',
    color: 'white',
    padding: '8px 16px',
    borderRadius: 'var(--rounded-md, 8px)',
  };

  const [isCopied, setCopied] = useState(false);

  const handleCopyClick = (textCopy: string) => {
    const textToCopy = textCopy;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return { toastStyle, isCopied, handleCopyClick };
}
