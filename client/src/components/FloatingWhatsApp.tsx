import { MessageCircle } from 'lucide-react';

type FloatingWhatsAppProps = {
  number: string;
  label: string;
  message: string;
};

export function FloatingWhatsApp({ number, label, message }: FloatingWhatsAppProps) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a className="floatingWhatsapp" href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <MessageCircle size={22} />
      <span>{label}</span>
    </a>
  );
}
