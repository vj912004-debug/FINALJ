import { company } from "@/data/site";

export const ENQUIRY_FALLBACK_MESSAGE =
  "The form could not be submitted automatically. Send the same details on WhatsApp or email and our team will respond.";

export function whatsappEnquiryUrl(text: string) {
  return `https://wa.me/91${company.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function mailtoEnquiryUrl(subject: string, body: string) {
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function publicEnquiryError(message: string) {
  if (/database|DATABASE_URL|prisma|migrate|unavailable/i.test(message)) {
    return ENQUIRY_FALLBACK_MESSAGE;
  }
  return message || ENQUIRY_FALLBACK_MESSAGE;
}
