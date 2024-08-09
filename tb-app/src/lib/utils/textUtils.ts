


export const changeContentToLinks= (content:string,post?:boolean) => {
    const reg = /@\w+\b/
    const remplacedContent = content.replace(reg,(match:any) => {
        const username = match.split('@')[1]
        if(post) {
            return `<a href="#" class=" text-blue-400 underline hover-opacity">${match}</a>`
        } else {

            return `<a href="/profile/${username}" class=" text-blue-400 underline hover-opacity">${match}</a>`
        }
        
    })
    const regLinks = /\b(?:https?:\/\/(?:www\.)?(?:[\w-]+\.)+[a-z]{2,})(?:\/[\w-./?%&=]*)?/
    const changedContent = remplacedContent.replace(regLinks,(match:any) => {
        if(post) {
            return `<a href="#" target="_blank" class=" text-blue-400 underline hover-opacity">${match}</a>`
        } else {
            return `<a href="${match}" target="_blank" class=" text-blue-400 underline hover-opacity">${match}</a>`

        }
    })
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\u200D|\p{Extended_Pictographic})/gu;
    const changedSecond = changedContent.replace(emojiRegex,(match:any) => {
        return (
            `<span class="font-noto">${match}</span>`
        )
    })
    return changedSecond
}