export function getSecretRegex() {
  return /^[A-Za-z]{8,}[sS]$/;
}

export function getSecretWord(regex: RegExp, text: string) {
  const words = text.split(' ');
  for (const word of words) {
      if (regex.test(word)) {
          return word;
      }
  }
}
