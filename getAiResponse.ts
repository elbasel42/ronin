import { GoogleGenerativeAI } from "@google/generative-ai";
import { file, write } from "bun";
// import { aiModel, systemInstruction } from "./config";
import { aiModelNameString } from "./config";

const apiKey = process.env.GEMINI_API_KEY as string;
const googleGenAi = new GoogleGenerativeAI(apiKey);

type GetAiResponseArgs = {
  prompt: string;
  // context?: string;
  responseMimeType?: "text" | "application/json" | "text/md";
  responseSchema?: object;
  task?: string;
};

export const getAiResponse = async ({
  task,
  prompt,
  // context,
  responseMimeType,
  responseSchema,
}: GetAiResponseArgs) => {
  // const aiStart = performance.now();
  // console.log("AI start", aiStart);
  const genModel = googleGenAi.getGenerativeModel({
    model: aiModelNameString,
    // systemInstruction: systemInstruction,
    generationConfig: {
      responseMimeType,
      responseSchema,
    },
  });
  // const { response } = await genModel.generateContent(prompt);
  const genContent = await genModel.generateContent(prompt);

  const { response } = genContent;
  const { text } = response;

  const responseText = text();
  const aiResponseFile = file("aiResponse/json/" + (task ?? prompt) + ".json");
  await write(aiResponseFile, responseText);
  // console.log(aiResponseFile.name);
  // const aiEnd = performance.now();
  // console.log(`AI took ${(aiEnd - aiStart) / 1000} seconds`);
  return responseText;
  // ! ========================================================================
};

// interface AiResponse {
//   functionCallResult?: any;
//   genContent?: any;
//   functionCalls?: any;
//   candidates?: Array<{
//     content: {
//       parts: Array<{
//         codeExecutionResult?: any;
//         executableCode?: any;
//         fileData?: any;
//         functionCall?: any;
//         functionResponse?: any;
//         inlineData?: any;
//         text?: string;
//       }>;
//       role?: string;
//     };
//     index?: number;
//     avgLogprobs?: any;
//     citationMetadata?: any;
//     finishMessage?: any;
//     finishReason?: any;
//     groundingMetadata?: any;
//     logprobsResult?: any;
//     safetyRatings?: any;
//   }>;
//   promptFeedback?: any;
//   usageMetadata?: any;
// }
