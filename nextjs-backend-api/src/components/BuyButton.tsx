'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

async function ensureRazorpayScript(): Promise<boolean> {
  if (window.Razorpay) {
    return true;
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface BuyButtonProps {
  courseId: string;
  courseTitle: string;
  isLoggedIn: boolean;
}

export default function BuyButton({
  courseId,
  courseTitle,
  isLoggedIn,
}: BuyButtonProps): React.ReactElement {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBuy = async (): Promise<void> => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      const scriptReady = await ensureRazorpayScript();

      if (!scriptReady || !window.Razorpay) {
        alert('Unable to load Razorpay checkout.');
        return;
      }

      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Could not create payment order.');
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'LearnHub',
        description: `Purchase: ${courseTitle}`,
        order_id: data.orderId,
        prefill: {
          name: data.user?.name,
          email: data.user?.email,
        },
        theme: {
          color: '#2563eb',
        },
        handler: function () {
          alert('Payment successful.');
          router.refresh();
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch {
      alert('Payment start failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="primary-btn" onClick={handleBuy} type="button" disabled={loading}>
      {loading ? 'Processing...' : 'Buy Course'}
    </button>
  );
}
