/**
 * Pterodactyl Panel API Client
 * Used to send commands to the game server
 */

const PTERODACTYL_API_URL = process.env.PTERODACTYL_API_URL;
const PTERODACTYL_API_KEY = process.env.PTERODACTYL_API_KEY;
const PTERODACTYL_SERVER_ID = process.env.PTERODACTYL_SERVER_ID;

interface CommandResponse {
  success: boolean;
  error?: string;
}

/**
 * Send a command to the Pterodactyl server
 * @param command The command to execute (e.g., "lp user {player} parent set vip")
 * @param playerNickname The player's nickname to replace {player} placeholder
 */
export async function sendServerCommand(
  command: string,
  playerNickname: string
): Promise<CommandResponse> {
  if (!PTERODACTYL_API_URL || !PTERODACTYL_API_KEY || !PTERODACTYL_SERVER_ID) {
    console.error('Pterodactyl configuration missing');
    return { success: false, error: 'Server configuration missing' };
  }

  // Replace {player} placeholder with actual nickname
  const finalCommand = command.replace(/{player}/g, playerNickname);

  try {
    const response = await fetch(
      `${PTERODACTYL_API_URL}/api/client/servers/${PTERODACTYL_SERVER_ID}/command`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PTERODACTYL_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ command: finalCommand }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Pterodactyl API error:', error);
      return { success: false, error: 'Failed to send command to server' };
    }

    return { success: true };
  } catch (error) {
    console.error('Pterodactyl connection error:', error);
    return { success: false, error: 'Connection error' };
  }
}

/**
 * Send multiple commands to the server
 * Used after payment confirmation to deliver all purchased items
 */
export async function sendMultipleCommands(
  commands: string[],
  playerNickname: string
): Promise<{ success: boolean; errors: string[] }> {
  const errors: string[] = [];

  for (const command of commands) {
    const result = await sendServerCommand(command, playerNickname);
    if (!result.success && result.error) {
      errors.push(`Command "${command}": ${result.error}`);
    }
    // Small delay between commands to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
