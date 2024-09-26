
import OpenAi from "openai"


const openAi = new OpenAi(
    {
        baseURL:process.env.NEXT_PUBLIC_OPEN_AI_URL,
        apiKey:process.env.NEXT_PUBLIC_OPEN_AI_KEY,
        dangerouslyAllowBrowser:true
    }
)

export default openAi