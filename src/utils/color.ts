/**
 * Determine if a given string is a valid hex color
 *
 * @param str
 * @returns boolean
 */
export const isHex = (str: string): boolean =>
  /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(str);

/**
 * If a given hex string is 3 digits, convert it to six.
 * This also returns the "#" because it's designed for use with input[type=color]
 *
 * @param str
 * @returns string
 */
export const enforceHex6 = (str: string): string => {
  const num = str.substring(1);

  if (num.length === 3) {
    const hex6 = num
      .split("")
      .map((hex) => hex + hex)
      .join("");

    return `#${hex6}`;
  }

  return str;
};
