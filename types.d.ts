type mapped<T> = T extends object ? { [Key in keyof T]: mapped<T[Key]> } : T;

type Children = Readonly<{
  children: React.ReactNode;
}>;
