export default function isSonataAwakening(sheet: string, sonata: string[])
{
  return (sheet.toLowerCase() === sonata.join("").toLowerCase());
}