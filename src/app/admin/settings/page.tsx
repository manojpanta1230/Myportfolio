import { getSettings } from "@/app/actions/settings";
import SettingsClient from "./SettingsClient";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return <SettingsClient initialSettings={settings} />;
}
