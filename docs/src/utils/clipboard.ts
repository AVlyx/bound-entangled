/**
 * Writes to the system clipboard, reporting whether it worked rather than throwing:
 * `navigator.clipboard` is unavailable on insecure origins and can be denied by
 * permission, and the callers use the result to decide whether to show the "copied"
 * feedback at all.
 */
export async function writeToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
