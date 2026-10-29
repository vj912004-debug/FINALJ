import { NextResponse } from "next/server";

const documents = [
  { id: "iso-9001", status: "available", number: "E20261055741", issueDate: "24-10-2026", expiryDate: "23-10-2029", url: "/documents/download?file=%2Fvendor-documents%2Fiso-9001-certificate.pdf" },
  { id: "iso-14001", status: "available", number: "E20261055742", issueDate: "24-10-2026", expiryDate: "23-10-2029", url: "/documents/download?file=%2Fvendor-documents%2Fiso-14001-certificate.pdf" },
  { id: "iso-45001", status: "available", number: "E20261055743", issueDate: "24-10-2026", expiryDate: "23-10-2029", url: "/documents/download?file=%2Fvendor-documents%2Fiso-45001-certificate.pdf" },
];

export function GET() {
  return NextResponse.json(documents);
}
