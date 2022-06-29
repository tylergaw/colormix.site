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
 * Thank you to https://gomakethings.com/converting-a-color-from-a-three-digit-hexcolor-to-a-six-digit-hexcolor-with-vanilla-js/
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

/**
 * Generate a random 6 digit hex color, including the "#"
 * Thank you to https://stackoverflow.com/a/1484514
 * @returns string
 */
export const getRandomHexColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
