// excel_Controller.js

/* 
const xlsx = require("xlsx");
const groqClient = require("../config/groq");

const excel_Controller = async (req, res) => {
    try {
        // 1️⃣ Validate file & prompt
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        if (!req.body.prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        console.log("File:", req.file.filename);
        console.log("Prompt:", req.body.prompt);

        // 2️⃣ Read Excel File
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.SheetNames[0];
        const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

        // 3️⃣ Create Prompt for Groq
        const fullPrompt = `
You are a JavaScript data transformer.
Input Excel JSON is below:
${JSON.stringify(excelData)}

User request:
"${req.body.prompt}"

Write ONLY JavaScript code:
- Input is a variable named "data"
- Output variable must be "result"
- No explanation
- No comments
- No backticks
`;

        // 4️⃣ Call Groq API
        const groqResponse = await groqClient.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: "You generate pure JavaScript code." },
                { role: "user", content: fullPrompt }
            ],
            temperature: 0
        });

        const aiCode = groqResponse.choices[0].message.content;
        console.log("\nAI Raw Code:\n", aiCode);

        // 5️⃣ CLEAN CODE: remove backticks + remove "javascript"
        const cleanedCode = aiCode
            .replace(/```/g, "")        // remove ```
            .replace(/javascript/g, "") // remove "javascript" tag
            .trim();

        console.log("\nAI Cleaned Code:\n", cleanedCode);

        // 6️⃣ EXECUTE CLEANED JAVASCRIPT CODE
        let data = excelData;
        let result;

        try {
            eval(cleanedCode); // run AI-generated JS
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "AI returned invalid JavaScript code",
                error: err.message
            });
        }

        if (!result) {
            return res.status(400).json({
                success: false,
                message: "AI did not produce a 'result' variable"
            });
        }

        // 7️⃣ SUCCESS RESPONSE
        return res.json({
            success: true,
            message: "Groq transformation successful",
            rowsBefore: excelData.length,
            rowsAfter: result.length,
            preview: result.slice(0, 5),
            fullData: result
        });

    } catch (error) {
        console.log(`Error in excel_Controller : ${error.message}`.bgRed);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = { excel_Controller };

 */

const xlsx = require("xlsx");
const groqClient = require("../config/groq");

const excel_Controller = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        if (!req.body.prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        console.log("File:", req.file.filename);
        console.log("Prompt:", req.body.prompt);

        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.SheetNames[0];
        const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

        const fullPrompt = `
You are a JavaScript data transformer.
Input Excel JSON is below:
${JSON.stringify(excelData)}

User request:
"${req.body.prompt}"

Write ONLY JavaScript code:
- Input is a variable named "data"
- Output must be EXACTLY: var result = ...
- You MUST use 'var' (NOT let or const)
- No explanation
- No comments
- No backticks
`;

        const groqResponse = await groqClient.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: "You generate pure JavaScript code only." },
                { role: "user", content: fullPrompt }
            ],
            temperature: 0
        });

        const aiCode = groqResponse.choices[0].message.content;
        console.log("\nAI Raw Code:\n", aiCode);

        const cleanedCode = aiCode
            .replace(/```/g, "")
            .replace(/javascript/g, "")
            .trim();

        console.log("\nAI Cleaned Code:\n", cleanedCode);

        let data = excelData;
        var result; // important: declare globally

        try {
            eval(cleanedCode);
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "AI returned invalid JavaScript code",
                error: err.message
            });
        }

        if (typeof result === "undefined") {
            return res.status(400).json({
                success: false,
                message: "AI did not produce a 'result' variable"
            });
        }

        return res.json({
            success: true,
            message: "Groq transformation successful",
            rowsBefore: excelData.length,
            rowsAfter: result.length,
            //preview: result.slice(0, 5),
            fullData: result
        });

    } catch (error) {
        console.log(`Error in excel_Controller : ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = { excel_Controller };
