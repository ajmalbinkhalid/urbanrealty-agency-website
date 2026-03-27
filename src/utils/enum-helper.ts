export const EnumHelper = {
  getKeyName<T extends Record<string, number>>(
    enumObj: T,
    value: number
  ): string | null {
    const entry = Object.entries(enumObj).find(([, val]) => val === value);
    const result = entry ? entry[0] : null;

    if (result === null) {
      return null;
    }

    return result.replace(/_/g, " ");
  },
};
