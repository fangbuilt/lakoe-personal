// import { useState } from "react";

// export default function useCopyToClipboard() {
//   const toastStyle = {
//     zindex: "1",
//     width: "400px",
//     height: "3em",
//     alignItems: "center",
//     display: "flex",
//     justifyContent: "space-between",
//     p: "12px",
//     position: "fixed" as const,
//     top: "80px",
//     left: "50%",
//     transform: "translateX(-50%)",
//     backgroundColor: "#1D1D1D",
//     color: "white",
//     padding: "8px 16px",
//     borderRadius: "var(--rounded-md, 8px)",
//     zIndex: "9",
//   };

//   const [isCopied, setCopied] = useState(false);

//   const handleCopyClick = (textCopy: string) => {
//     const textToCopy = textCopy;

//     navigator.clipboard.writeText(textToCopy).then(() => {
//       setCopied(true);
//       setTimeout(() => {
//         setCopied(false);
//       }, 1000);
//     });
//   };

//   return { toastStyle, isCopied, handleCopyClick };
// }

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
    zIndex: '9',
  };

  const [isCopied1, setIsCopied1] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);
  const [isCopied3, setIsCopied3] = useState(false);

  const handleCopyClick = (
    textCopy: string,
    setIsCopied: (value: boolean) => void
  ) => {
    const textToCopy = textCopy;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    });
  };

  return {
    toastStyle,
    isCopied1,
    isCopied2,
    isCopied3,
    setIsCopied1,
    setIsCopied2,
    setIsCopied3,
    handleCopyClick,
  };
}
