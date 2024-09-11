const emojis: string[] = []

function generateEmojis() {
    // Unicode code point ranges for emojis
    const ranges = [
        [0x1F600, 0x1F64F], // Emoticons
        [0x1F300, 0x1F5FF], // Symbols and pictographs
        [0x1F680, 0x1F6FF], // Transport and map symbols
        [0x1F700, 0x1F77F], // Alchemical symbols
        [0x1F780, 0x1F7FF], // Geometric shapes
        [0x1F800, 0x1F8FF], // Additional symbols
        [0x1F900, 0x1F9FF], // Additional symbols 2
        [0x1FA00, 0x1FA6F], // Additional symbols 3
        [0x1FA70, 0x1FAFF], // Additional symbols 4
        [0x2600, 0x26FF],   // Miscellaneous symbols
        [0x2700, 0x27BF],   // Dingbats
        [0x2300, 0x23FF],   // Technical symbols
    ];

    for (const [start, end] of ranges) {
        for (let codePoint = start; codePoint <= end; codePoint++) {
            const emoji = String.fromCodePoint(codePoint);
            if (emoji !== String.fromCodePoint(0xFE0F) && emoji !== String.fromCodePoint(0xFEFF)) { // Avoid format characters
                emojis.push(emoji);
            }
        }
    }

}

export function getAllEmojis(): string[] {
    if (emojis.length == 0) {
        generateEmojis()
    }

    return emojis;
}