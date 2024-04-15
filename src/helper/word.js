  // word count for product title
  const wordCount = (str, count) => {
    console.log(str)
    const trimmedStr = str.trim();
    const words = trimmedStr.split(/\s+/);
    const selectedWords = words.slice(0, count);
    const result = selectedWords.join(" ");

    return `${result}...`;
  };

  export {
    wordCount
  }
