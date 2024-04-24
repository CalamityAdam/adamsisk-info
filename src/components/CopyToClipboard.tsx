import { useState } from 'react';

interface CopyToClipboardProps {
  text: string;
  children: React.ReactNode;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  text,
  children,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <span
      onClick={handleCopy}
      className='cursor-pointer inline-flex items-center'
    >
      {children}
      {copied && <span className='text-sm text-green'>Copied!</span>}
    </span>
  );
};

export default CopyToClipboard;
