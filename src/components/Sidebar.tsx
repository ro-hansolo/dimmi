import React from "react";
import { useTranslation } from "react-i18next";
import {
  Cpu,
  FlaskConical,
  History,
  Info,
  Settings,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useSettings } from "../hooks/useSettings";
import {
  GeneralSettings,
  AdvancedSettings,
  HistorySettings,
  DebugSettings,
  AboutSettings,
  PostProcessingSettings,
  ModelsSettings,
} from "./settings";

export type SidebarSection = keyof typeof SECTIONS_CONFIG;

interface IconProps {
  width?: number | string;
  height?: number | string;
  size?: number | string;
  className?: string;
  [key: string]: any;
}

interface SectionConfig {
  labelKey: string;
  icon: React.ComponentType<IconProps>;
  /** Dimmi: colour of the System Settings-style squircle tile. */
  tileColor: string;
  component: React.ComponentType;
  enabled: (settings: any) => boolean;
}

export const SECTIONS_CONFIG = {
  general: {
    labelKey: "sidebar.general",
    icon: Settings,
    tileColor: "#8E8E93",
    component: GeneralSettings,
    enabled: () => true,
  },
  history: {
    labelKey: "sidebar.history",
    icon: History,
    tileColor: "#007AFF",
    component: HistorySettings,
    enabled: () => true,
  },
  models: {
    labelKey: "sidebar.models",
    icon: Cpu,
    tileColor: "#AF52DE",
    component: ModelsSettings,
    enabled: () => true,
  },
  advanced: {
    labelKey: "sidebar.advanced",
    icon: SlidersHorizontal,
    tileColor: "#5856D6",
    component: AdvancedSettings,
    enabled: () => true,
  },
  postprocessing: {
    labelKey: "sidebar.postProcessing",
    icon: Sparkles,
    tileColor: "#FF9500",
    component: PostProcessingSettings,
    enabled: (settings) => settings?.post_process_enabled ?? false,
  },
  debug: {
    labelKey: "sidebar.debug",
    icon: FlaskConical,
    tileColor: "#FF3B30",
    component: DebugSettings,
    enabled: (settings) => settings?.debug_mode ?? false,
  },
  about: {
    labelKey: "sidebar.about",
    icon: Info,
    tileColor: "#30B0C7",
    component: AboutSettings,
    enabled: () => true,
  },
} as const satisfies Record<string, SectionConfig>;

interface SidebarProps {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const { t } = useTranslation();
  const { settings } = useSettings();

  const availableSections = Object.entries(SECTIONS_CONFIG)
    .filter(([_, config]) => config.enabled(settings))
    .map(([id, config]) => ({ id: id as SidebarSection, ...config }));

  return (
    <nav
      data-tauri-drag-region
      className="app-sidebar flex flex-col w-[200px] shrink-0 h-full border-e-[0.5px] border-separator px-2.5 pb-2.5 overflow-y-auto"
    >
      <div className="flex flex-col w-full gap-0.5">
        {availableSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <div
              key={section.id}
              className={`flex gap-2 items-center h-7 shrink-0 px-1.5 w-full rounded-[7px] cursor-default text-[13px] leading-4 text-text ${
                isActive ? "app-sidebar-selected" : "hover:bg-fill/40"
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              <span
                className="mac-tile"
                style={{ backgroundColor: section.tileColor }}
              >
                <Icon width={13} height={13} strokeWidth={2.4} />
              </span>
              <p className="truncate" title={t(section.labelKey)}>
                {t(section.labelKey)}
              </p>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
