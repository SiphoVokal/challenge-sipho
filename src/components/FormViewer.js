import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const FormViewer = ({ formId }) => {
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/api/forms/${formId}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [formId]);

  const submitAnswers = async () => {
    await fetch(`http://localhost:8080/api/forms/${formId}/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    alert("Submitted!");
  };

  if (!form) return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 font-sans text-gray-800">
      <h1 className="text-2xl font-semibold mb-6 border-b pb-2">{form.title}</h1>

      {form.questions.map((q) => (
        <div key={q.id} className="mb-6">
          <label className="block text-md mb-1">{q.text}</label>
          <input
            type="text"
            className="w-full border-b border-gray-400 py-2 px-1 focus:outline-none focus:border-black transition"
            placeholder="Type your answer..."
            onChange={(e) =>
              setAnswers({ ...answers, [q.id]: e.target.value })
            }
          />
        </div>
      ))}

      <button
        onClick={submitAnswers}
        className="flex items-center gap-2 border-b border-black text-gray-700 hover:text-black transition"
      >
        Submit <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default FormViewer;
