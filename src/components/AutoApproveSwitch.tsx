'use client';

import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/hooks/useSettings';

export function AutoApproveSwitch() {
  const { settings, updateSettings } = useSettings();

  const handleToggle = async (checked: boolean) => {
    try {
      await updateSettings({ autoApprove: checked });
    } catch (error) {
      console.error('Failed to update auto approve setting:', error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={settings.autoApprove}
        onCheckedChange={handleToggle}
      />
      <label className="text-sm font-medium">
        Auto-approve
      </label>
    </div>
  );
}