
import OpenAi from "openai"


const openAi = new OpenAi(
    {
        baseURL:"https://openrouter.ai/api/v1",
        apiKey:process.env.NEXT_PUBLIC_OPEN_AI_KEY,
        dangerouslyAllowBrowser:true
    }
)

export default openAi