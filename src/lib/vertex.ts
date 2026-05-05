import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

export async function askVertex(prompt: string): Promise<string> {
  const BEDROCK_MODEL_ID = "us.meta.llama4-scout-17b-instruct-v1:0";
  const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || "us-west-2",
});
    const formattedPrompt = `
    <|begin_of_text|><|start_header_id|>user<|end_header_id|>
    ${prompt}
    <|eot_id|>
    <|start_header_id|>assistant<|end_header_id|>`;
  
    const response = await bedrockClient.send(
      new InvokeModelCommand({
        contentType: "application/json",
        body: JSON.stringify({ prompt: formattedPrompt }),
        modelId: BEDROCK_MODEL_ID,
      })
    );
  
    const nativeResponse = JSON.parse(new TextDecoder().decode(response.body));
    return nativeResponse.generation || "";
}

// Deprecated since Bedrock handles streams natively in the handler, but kept to prevent external breaks.
export function GCloudStreamToReadableStream(stream: any): ReadableStream {
    const encoder = new TextEncoder();
    return new ReadableStream({
        async pull(controller) { controller.close(); }
    });
}

// Kept strictly to prevent your external files from breaking on import.
export async function getValidToken() {
    return "aws-uses-iam-credentials-not-bearer-tokens";
}

export async function textEmbedding(text: string): Promise<number[]> {
    // Swapped from Google text-embedding to Amazon Titan Embeddings V2
    const modelId = "amazon.titan-embed-text-v2:0";
  const bedrockClient = new BedrockRuntimeClient({
      region: process.env.AWS_REGION || "us-west-2",
  });
    try {
      const response = await bedrockClient.send(
        new InvokeModelCommand({
          contentType: "application/json",
          accept: "application/json",
          body: JSON.stringify({ inputText: text }),
          modelId: modelId,
        })
      );
      
      const nativeResponse = JSON.parse(new TextDecoder().decode(response.body));
      return nativeResponse.embedding as number[];
    } catch (err: any) {
      console.error("Embedding request failed:", err);
      throw err;
    }
}