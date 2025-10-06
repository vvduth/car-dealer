
"use client";
const TestimonialsSection = () => {
    const testimonials = [
      {
        quote: "The most seamless car buying experience I've ever had. The team was professional, transparent, and incredibly helpful. I got a great car at a fair price.",
        name: "Alex R.",
        location: "Federal Way, WA"
      },
      {
        quote: "I was dreading the process of buying a used car, but they made it so easy. No pressure, just genuine advice. Highly recommended!",
        name: "Samantha B.",
        location: "Tacoma, WA"
      },
      {
        quote: "Found the exact model I was looking for in pristine condition. The quality of their collection is top-notch. I'll definitely be back for my next car.",
        name: "Michael T.",
        location: "Seattle, WA"
      }
    ];
  
    return (
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground">What Our Customers Say</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-md">
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                <p className="mt-4 font-semibold text-foreground">- {testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TestimonialsSection;
  