import React from 'react';

const OurPhilosophyPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Our Philosophy</h1>
      <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-600 text-left">
        <p>
          <span className="font-bold text-primary">Curation over Volume:</span> We don't aim to have the most cars, just the best. Each vehicle in our collection is hand-selected and rigorously inspected to meet our high standards of quality, reliability, and value. We seek out vehicles with character and a story, ensuring you're not just buying a car, but a piece of automotive history.
        </p>
        <p>
          <span className="font-bold text-primary">Transparency at the Core:</span> The traditional car-buying experience is often clouded with uncertainty. We're changing that. From clear, upfront pricing to comprehensive vehicle history reports, we provide all the information you need to make a confident and informed decision. No hidden fees, no last-minute surprises.
        </p>
        <p>
          <span className="font-bold text-primary">A Partnership Approach:</span> We see ourselves as your personal automotive curators, not just salespeople. Our goal is to build a long-term relationship based on trust and mutual respect. We're here to offer expert advice and a no-pressure environment, helping you find the perfect vehicle that fits your lifestyle and budget.
        </p>
      </div>
    </div>
  );
};

export default OurPhilosophyPage;
