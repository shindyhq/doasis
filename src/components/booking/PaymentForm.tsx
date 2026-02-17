'use client';

import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';

interface PaymentFormProps {
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
  amount: number;
}

export function PaymentForm({ onSuccess, onCancel, amount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
        setError(submitError.message || 'An error occurred');
        setProcessing(false);
        return;
    }

    // We don't verify the PaymentIntent here client-side in this specific flow 
    // because we want to trigger the booking creation on the server AFTER confirmation.
    // However, for this simple flow, we might assume the parent component handles the confirmation logic 
    // based on the PaymentElement's completion, OR we handle the confirmation here.
    
    // Actually, elements.submit() just validates. We need to confirm the payment.
    // But we need the clientSecret from the parent or context. 
    // The parent should have ALREADY created the PaymentIntent and wrapped this form in <Elements>.
    
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking/confirmation`,
      },
      redirect: 'if_required', // Avoid redirect if not 3DS
    });

    if (result.error) {
      setError(result.error.message || 'Payment failed');
      setProcessing(false);
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      onSuccess(result.paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-primary/10">
        <PaymentElement />
      </div>

      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-4 text-primary/60 hover:text-primary font-bold uppercase text-xs tracking-widest transition-colors"
          disabled={processing}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 bg-accent text-primary py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {processing ? <Loader2 className="animate-spin w-4 h-4" /> : `Pay $${amount}`}
        </button>
      </div>
    </form>
  );
}
