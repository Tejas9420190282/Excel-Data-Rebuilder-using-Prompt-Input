// Home.jsx
import React, { useState } from "react";
import axios from "axios";

function Home() {
    const [file, setFile] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // 📌 Handle File Select
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // 📌 Handle Button Click (Send file + prompt to backend)
    const handleProcess = async () => {
        if (!file) {
            alert("Please upload an Excel file first.");
            return;
        }

        if (!prompt.trim()) {
            alert("Please enter a prompt.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("prompt", prompt);

            const response = await axios.post(
                "http://localhost:4545/process-excel",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("Result:", response.data);
            setResult(response.data.fullData);

        } catch (error) {
            console.error(error);
            alert("Error processing file. Check backend.");
        }

        setLoading(false);
    };

    return (
        <>
            <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-blue-700">
                    Excel Data Rebuilder
                </h1>

                {/* Upload Section */}
                <div className="bg-white shadow p-6 rounded-lg w-full max-w-xl">
                    <label className="font-semibold text-gray-700">
                        Upload Excel File (.xlsx)
                    </label>
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                        className="mt-2 w-full border rounded p-2"
                    />

                    {/* Prompt Input */}
                    <label className="font-semibold text-gray-700 mt-4 block">
                        Enter Transformation Prompt
                    </label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={4}
                        className="mt-2 w-full border rounded p-2"
                        placeholder="Example: Filter rows where ID > 50"
                    ></textarea>

                    {/* Process Button */}
                    <button
                        onClick={handleProcess}
                        disabled={loading}
                        className="mt-5 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Processing..." : "Process File"}
                    </button>
                </div>


                {/* SHOW RESULT */}
                {result && (
                    <div className="mt-10 w-full max-w-3xl bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-bold mb-4">Processed Result Preview</h2>

                        <div className="overflow-auto max-h-80 border">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        {Object.keys(result[0]).map((key) => (
                                            <th key={key} className="border p-2 text-left">
                                                {key}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.slice(0, 10).map((row, index) => (
                                        <tr key={index} className="border">
                                            {Object.values(row).map((value, i) => (
                                                <td key={i} className="border p-2">
                                                    {value}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="text-gray-600 mt-2">
                            Showing first 10 rows only…
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;
