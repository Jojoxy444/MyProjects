export default function printArray(array: string[])
{
  console.log(`List of destinations:`)
  for (let i = 0; i < array.length; i++)
  {
    console.log(i + 1 + ` ` + `-` + ` ` + array[i]);  
  }
}
