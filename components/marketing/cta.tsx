import React from "react";

export default function Cta() {
  return (
    <div className="cta_elements bg-gray-950 w-full py-24">
      <h2 className="text-white text-4xl font-semibold">
        Unleash the power of teamwork
      </h2>
      <h6 className="text-white text-base font-light py-2">
        Join millions teaming up on their best work
      </h6>
      <button
        type="submit"
        className="inline-flex items-center justify-center px-3 py-2 mt-3 font-medium text-white transition-all 8uration-200 border border-white rounded-full">
        Get started for free
      </button>
    </div>
  );
}
