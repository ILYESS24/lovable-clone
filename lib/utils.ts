import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCuteAppName(): string {
  const adjectives = ['cute', 'happy', 'bright', 'sunny', 'sparkly', 'bouncy', 'cheerful', 'playful'];
  const nouns = ['app', 'project', 'creation', 'build', 'craft', 'design', 'studio', 'workshop'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  
  return `${adjective}-${noun}-${number}`;
}