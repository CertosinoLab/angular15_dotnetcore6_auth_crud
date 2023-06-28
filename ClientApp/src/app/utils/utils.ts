export class Utils {
  static capitalizeFirstLetter(str: string): string {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static formatColumnName(value: string): string {
    if (value.length === 0) return value;
    let transformedString = value.charAt(0).toUpperCase();

    for (let i = 1; i < value.length; i++) {
      if (value.charAt(i).toUpperCase() === value.charAt(i)) {
        transformedString += ' ';
      }
      transformedString += value.charAt(i);
    }

    return transformedString;
  }
}
