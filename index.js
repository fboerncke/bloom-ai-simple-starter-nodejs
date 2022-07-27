const fetch = require('node-fetch');

const apiToken = "<your-api-token-here>";

/**
 * async main method declaration
 */
(async function () {

    // add your prompt here
    const prompt = "Q: What is a black hole?\nA: a black hole is ";

    // payload parameters: https://huggingface.co/docs/api-inference/detailed_parameters
    const payload = {
        "inputs": prompt,
        "parameters": {
            "temperature": 1,
            "min_length": 25,
            "max_new_tokens": 50,
            "return_full_text": true,
            "do_sample": false,
            "seed": 10,
            "early_stopping": false,
            "length_penalty": 0.0
        },
        "options": {
            "use_cache": false,
            "wait_for_model": false
        }
    }

    console.log("Evaluating your request - this may take some time - be patient");
    let result = await askBloom(payload);

    console.log("**Prompt**:     \"*" + prompt.trim() + "*\"");
    try {
        console.log("\n**Completion**: \"*" + result[0].generated_text + "*\"");
    } catch (e) {
        console.log("Error: " + e + "\n" + JSON.stringify(result, null, "  "));
    }
}());

/**
 * Call bloom API to generate a response
 * 
 * @param {object} jsonPayload - payload to send to bloom
 * @returns 
 */
async function askBloom(jsonPayload) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify(jsonPayload)
    };
    const response = await fetch("https://api-inference.huggingface.co/models/bigscience/bloom", options)
    return await response.json()
}
