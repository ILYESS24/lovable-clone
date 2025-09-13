'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSettings } from '@/hooks/useSettings';

export function ChatModeSelector() {
  const { settings, updateSettings } = useSettings();

  const handleModeChange = async (mode: string) => {
    try {
      await updateSettings({ chatMode: mode as 'chat' | 'code' | 'debug' });
    } catch (error) {
      console.error('Failed to update chat mode:', error);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Select value={settings.chatMode} onValueChange={handleModeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chat">Chat</SelectItem>
              <SelectItem value="code">Code</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectContent>
          </Select>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mode de conversation</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}