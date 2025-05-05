import React, { useState } from "react";
import { ArrowRight, Trash2, MoveUp, MoveDown } from "lucide-react";

const FormbuilderPreview = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "text", options: [""] }]);
  };

  const updateQuestionText = (index, value) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };

  const updateQuestionType = (index, type) => {
    const updated = [...questions];
    updated[index].type = type;
    if (["radio", "checkbox", "dropdown"].includes(type)) {
      updated[index].options = ["Option 1"];
    } else {
      delete updated[index].options;
    }
    setQuestions(updated);
  };

  const updateOption = (qIdx, oIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  const addOption = (index) => {
    const updated = [...questions];
    updated[index].options.push(`Option ${updated[index].options.length + 1}`);
    setQuestions(updated);
  };

  const deleteOption = (qIdx, oIdx) => {
    const updated = [...questions];
    updated[qIdx].options.splice(oIdx, 1);
    setQuestions(updated);
  };

  const moveOption = (qIdx, oIdx, direction) => {
    const updated = [...questions];
    const opts = updated[qIdx].options;
    const newIdx = oIdx + direction;
    if (newIdx >= 0 && newIdx < opts.length) {
      [opts[oIdx], opts[newIdx]] = [opts[newIdx], opts[oIdx]];
    }
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:8080/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, questions }),
    });
    alert("Form created!");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 font-sans text-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">Form Builder</h1>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="text-xl mt-2 text-blue-600 hover:underline"
        >
          {previewMode ? "Back to Edit" : "Preview"}
        </button>
      </div>

      {previewMode ? (
        <div>
          <input
            type="text"
            className="w-full py-2 px-1 mb-8 text-black font-semibold text-center"
            value={title || "Untitled Form"}
            disabled
          />
          {questions.map((q, idx) => (
            <div key={idx} className="mb-6 border-b pb-6">
              <input
                type="text"
                className="w-full border-b border-gray-400 py-2 px-1 mb-4 bg-grey-50 text-black"
                value={q.text || "Untitled Question"}
                disabled
              />
              {q.type === "text" && (
                <input
                  type="text"
                  className="w-full border-b border-gray-400 py-2 px-1 bg-gray-50 text-black"
                  disabled
                  placeholder="User response"
                />
              )}
              {q.type === "yesno" && (
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input type="radio" disabled /> Yes
                  </label>
                  <label className="flex items-center gap-2 text-gray-600">
                    <input type="radio" disabled /> No
                  </label>
                </div>
              )}
              {["radio", "checkbox"].includes(q.type) && (
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center gap-2 text-gray-600">
                      <input type={q.type} disabled /> {opt || `Option ${i + 1}`}
                    </label>
                  ))}
                </div>
              )}
              {q.type === "dropdown" && (
                <select className="w-full border-b border-gray-400 py-2 px-1 bg-gray-50 text-black" disabled>
                  {q.options.map((opt, i) => (
                    <option key={i}>{opt || `Option ${i + 1}`}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <input
            className="w-full border-b border-gray-400 py-2 px-1 mb-2 focus:outline-none focus:border-black transition font-semibold text-center"
            placeholder="Form Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {questions.map((q, index) => (
            <div key={index} className="mb-6 border-b pb-6">
              <input
                className="w-full border-b border-gray-400 py-2 px-1 mb-4 focus:outline-none focus:border-black transition"
                placeholder="Question Text"
                value={q.text}
                onChange={(e) => updateQuestionText(index, e.target.value)}
              />
              <select
                className="w-full bg-transparent border-b border-gray-400 py-2 px-1 mb-4 focus:outline-none focus:border-black transition"
                value={q.type}
                onChange={(e) => updateQuestionType(index, e.target.value)}
              >
                <option value="text">Text</option>
                <option value="radio">Single Selector</option>
                <option value="checkbox">Multi Selector</option>
                <option value="dropdown">Dropdown Selector</option>
                <option value="yesno">Yes / No</option>
              </select>

              {["radio", "checkbox", "dropdown"].includes(q.type) && (
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex gap-2 items-center">
                      <input
                        className="w-full border-b border-gray-400 py-2 px-1 focus:outline-none focus:border-black transition"
                        placeholder={`Option ${optIdx + 1}`}
                        value={opt}
                        onChange={(e) => updateOption(index, optIdx, e.target.value)}
                      />
                      <button onClick={() => moveOption(index, optIdx, -1)}>
                        <MoveUp size={16} className="text-gray-500" />
                      </button>
                      <button onClick={() => moveOption(index, optIdx, 1)}>
                        <MoveDown size={16} className="text-gray-500" />
                      </button>
                      <button onClick={() => deleteOption(index, optIdx)}>
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addOption(index)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    + Add Option
                  </button>
                </div>
              )}

              {q.type === "yesno" && (
                <p className="text-gray-500 text-sm mt-2">
                  User will select Yes or No
                </p>
              )}
            </div>
          ))}

          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={addQuestion}
              className="flex items-center gap-2 border-b border-black hover:text-black text-gray-700 transition"
            >
              Add Question <ArrowRight size={16} />
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 border-b border-black hover:text-black text-gray-700 transition"
            >
              Save Form <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FormbuilderPreview;
