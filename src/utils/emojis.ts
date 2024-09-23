export type EmojiReference = {
  category: string;
  emojiIndex: number;
}

// Unicode code point ranges for emojis
const emojiRangeMap = new Map([
    ['emoticons', [0x1F600, 0x1F64F]],
    //['symbols', [0x1F300, 0x1F5FF]],
    ['transport', [0x1F680, 0x1F6FF]],
    //['alchemical', [0x1F700, 0x1F77F]],
    //['shapes', [0x1F780, 0x1F7FF]],
    //['additional', [0x1F800, 0x1F8FF]],
    ['additional2', [0x1F900, 0x1F9FF]],
    //['additional3', [0x1FA00, 0x1FA6F]],
    ['additional4', [0x1FA70, 0x1FAFF]],
    ['miscellaneous', [0x2600, 0x26FF]],
    ['dingbats', [0x2700, 0x27BF]],
    ['technical', [0x2300, 0x23FF]]
]);

export const emojis = new Map<string, string[]>()

const generateEmojis = () => {
    emojiRangeMap.forEach( (range, category) => {
        const [start, end] = range

        const tempEmojis = []
        for(let codePoint = start; codePoint <= end; codePoint ++) {
            const emoji = String.fromCodePoint(codePoint)
            if (emoji !== String.fromCodePoint(0xFE0F) && emoji !== String.fromCodePoint(0xFEFF)) {
                tempEmojis.push(emoji)
            }
        }

        emojis.set(category, tempEmojis)
    })
}
generateEmojis();

export const getEmoji = (emojiReference: EmojiReference): string | undefined => {
  const emojiCategory = emojis.get(emojiReference.category);
  return emojiCategory ? emojiCategory[emojiReference.emojiIndex] : undefined;
}
