import { FaCode, FaMobileAlt, FaServer, FaLaptopCode, FaCloud } from "react-icons/fa";

const SERVICE_ICONS = {
  code: FaCode,
  mobile: FaMobileAlt,
  server: FaServer,
  laptop: FaLaptopCode,
  cloud: FaCloud,
};

export const SERVICE_ICON_OPTIONS = Object.keys(SERVICE_ICONS);

export function getServiceIcon(iconKey, size = 56) {
  const Icon = SERVICE_ICONS[iconKey] || FaCode;
  return <Icon size={size} />;
}
