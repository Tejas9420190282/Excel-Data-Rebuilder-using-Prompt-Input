// Home.jsx

import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Home() {
    const [file, setFile] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = async () => {
        
    } 

    const handleProcess = async () => {

    }

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
                        placeholder="Example: Filter rows where sales > 10000"
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
            </div>
        </>
    );
}

export default Home;
