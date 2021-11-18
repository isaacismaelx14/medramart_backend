import ramdon from "crypto";
type config = {
  useSeparators?: boolean;
  useUpperCase?: boolean;
  separator?: string;
  bytes: number;
};

const configDefaults = {
  useSeparators: true,
  useUpperCase: true,
  separator: "_",
  bytes: 4,
};

export const GenerateID = (prefix: string, config: config = configDefaults) => {
  const { useSeparators, separator, bytes, useUpperCase} = config;

  const randomBytes = ramdon.randomBytes(bytes).toString("hex");
  const middle = useSeparators ? separator : "";
  const generatedID = `${prefix}${middle}${randomBytes}`;

  return useUpperCase ? generatedID.toUpperCase() : generatedID;
};
