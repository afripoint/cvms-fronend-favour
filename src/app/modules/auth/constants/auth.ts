import type { CountryCode } from "../types/auth"

export const REGISTRATION_STEPS = [
  { number: 1, title: "Account Type", subtitle: "Select your account type" },
  { number: 2, title: "User Information", subtitle: "Your details here" },
  { number: 3, title: "Account Verification", subtitle: "Verify your account" },
]

export const ACCOUNT_TYPES = [
  {
    id: "individual",
    title: "Individual Account",
    description:
      "For individuals who want to track shipments, view consignment status updates, and search for accredited agents.",
    value: "individual account",
    icon: "src/assets/icons/company.png",
  },
  {
    id: "agent",
    title: "Agent Account",
    description:
      "For licensed agents or companies authorized by customs to manage clearance processes, review certifications, and perform local TIN verification.",
    value: "agent account/freight forwarders",
    icon: "src/assets/icons/agent.png",
  },
  {
    id: "company",
    title: "Company Account",
    description:
      "For businesses involved in import/export activities that want to verify status, track consignments, search for accredited agents, and access all other account features.",
    value: "company account",
    icon: "src/assets/icons/individual.png",
  },
]

export const ACCREDIFY_SERVICES = [
  "Freight Forwarders",
  "Customs Clearing Agents",
  "Shippers",
  "Maritime Truckers",
  "Bonded Ports & Terminals",
  "Bonded Warehouses",
  "Carriers/ Transporters",
]

export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Customs Clearing Agents":
    "Licensed professionals who handle customs clearance, ensure regulatory compliance, and facilitate import/export processing",
  "Bonded Warehouses":
    "Secure storage facilities where imported goods are held duty-free and cleared for sale or further processing",
  "Bonded Ports & Terminals":
    "Customs-controlled entry points where goods are temporarily stored and processed before clearance",
  "Freight Forwarders/Clearing Agents":
    "Logistics experts who manage customs documentation, coordinate cargo movement, and help navigate regulations",
  "Carriers/ Transporters":
    "Responsible for transporting goods via road, rail, air or sea, ensuring safe and efficient delivery",
  "Freight Forwarders":
    "Logistics experts who manage customs documentation, coordinate cargo movement, and help navigate regulations",
  "Maritime Truckers": "Specialists in transporting shipping containers to and from ports",
  Shippers: "Companies or individuals who send goods via freight transportation",
}

export const COUNTRY_CODES: CountryCode[] = [
  {
    name: "Nigeria",
    code: "NG",
    dialCode: "+234",
    flag: "/flags/ng.svg",
  },
  {
    name: "United States",
    code: "US",
    dialCode: "+1",
    flag: "/flags/us.svg",
  },
  {
    name: "United Kingdom",
    code: "GB",
    dialCode: "+44",
    flag: "/flags/gb.svg",
  },
  {
    name: "France",
    code: "FR",
    dialCode: "+33",
    flag: "/flags/fr.svg",
  },
]

