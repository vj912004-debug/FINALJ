import { Mail, MessageCircle } from "lucide-react";
import {
  ENQUIRY_FALLBACK_MESSAGE,
  mailtoEnquiryUrl,
  whatsappEnquiryUrl,
} from "@/lib/enquiry-links";

export default function EnquiryFallback({
  subject,
  message,
}: {
  subject: string;
  message: string;
}) {
  return (
    <div
      className="mt-4 border border-brand/30 bg-brand/5 p-4 text-sm text-steel"
      role="alert"
    >
      <p>{ENQUIRY_FALLBACK_MESSAGE}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={whatsappEnquiryUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp btn-shine border-0"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Send on WhatsApp
        </a>
        <a href={mailtoEnquiryUrl(subject, message)} className="btn btn-outline">
          <Mail className="h-4 w-4" aria-hidden />
          Email enquiry
        </a>
      </div>
    </div>
  );
}
