import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="container mx-auto px-6 py-16"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading" className="text-subtitle mb-8">
        Get In Touch
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto space-y-6"
        noValidate
      >
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-lg mb-2 text-[#1a1a1a]"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className="w-full px-4 py-3 border border-[#d42f3f]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d42f3f] focus:border-transparent transition-shadow"
            {...register('name')}
          />
          {errors.name && (
            <p
              id="name-error"
              role="alert"
              className="text-[#d42f3f] text-sm mt-1"
            >
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-lg mb-2 text-[#1a1a1a]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full px-4 py-3 border border-[#d42f3f]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d42f3f] focus:border-transparent transition-shadow"
            {...register('email')}
          />
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="text-[#d42f3f] text-sm mt-1"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-lg mb-2 text-[#1a1a1a]"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className="w-full px-4 py-3 border border-[#d42f3f]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d42f3f] focus:border-transparent transition-shadow"
            {...register('message')}
          />
          {errors.message && (
            <p
              id="message-error"
              role="alert"
              className="text-[#d42f3f] text-sm mt-1"
            >
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#d42f3f] text-white px-6 py-3 rounded-md text-lg font-medium hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#d42f3f]/50 disabled:opacity-70 disabled:cursor-not-allowed transition"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span role="status" className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <p
            role="alert"
            className="text-green-600 text-center text-lg"
            aria-live="polite"
          >
            Thanks for your message! I'll get back to you soon.
          </p>
        )}
        {submitStatus === 'error' && (
          <p
            role="alert"
            className="text-[#d42f3f] text-center text-lg"
            aria-live="assertive"
          >
            Sorry, something went wrong. Please try again later.
          </p>
        )}
      </form>
    </section>
  );
};