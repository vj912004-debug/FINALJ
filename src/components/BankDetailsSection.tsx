import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { bankDetails, company, vendorRegistration } from "@/data/site";
import { FadeIn } from "@/components/motion/Motion";

const rows = [
  { label: "Account Name", value: bankDetails.accountName },
  { label: "Bank Name", value: bankDetails.bankName },
  { label: "Account Number", value: bankDetails.accountNumber },
  { label: "IFSC Code", value: bankDetails.ifsc },
  { label: "Account Type", value: bankDetails.accountType },
  { label: "Branch", value: bankDetails.branch },
] as const;

export default function BankDetailsSection() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Vendor Registration
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
            Bank Details
          </h2>
          <p className="mt-2 text-base italic text-brand">
            {bankDetails.slogan}
          </p>
          <div className="mt-4 h-1 w-16 bg-brand" aria-hidden />

          <div className="mt-6 overflow-hidden border border-line">
            <div className="bg-navy px-4 py-3 font-display text-sm font-bold uppercase tracking-wide text-white">
              {company.name} — Current Account
            </div>
            <table className="w-full text-left text-sm">
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-background" : "bg-surface"}
                  >
                    <th className="w-40 border-b border-line px-4 py-3 font-semibold text-navy">
                      {row.label}
                    </th>
                    <td className="border-b border-line px-4 py-3 font-medium text-ink">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-steel">
            Branch address: {bankDetails.branchAddress}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-brand">
            {bankDetails.watermark}
          </p>
          <p className="mt-2 text-sm font-medium text-navy">
            {bankDetails.secureSlogan}
          </p>

          <div className="mt-6 flex gap-3 border border-brand/30 bg-brand/5 p-4 text-sm text-ink">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <div>
              <p className="font-bold uppercase text-brand">Important</p>
              <p className="mt-1 text-steel">{bankDetails.notice}</p>
            </div>
          </div>

          <ul className="mt-8 space-y-3">
            {vendorRegistration.map((msg) => (
              <li key={msg} className="flex gap-2 text-sm text-steel">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {msg}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
