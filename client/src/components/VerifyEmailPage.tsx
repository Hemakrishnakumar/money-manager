import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/v1/auth/verify-email?token=${token}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");
        } else {
          const err = await res.json();
          setStatus("error");
          setMessage(err.message || "Verification failed. The link might be expired or invalid.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {status === "loading" && <p className="text-gray-600">Verifying your email...</p>}
      {status === "success" && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-600">✅ Verification Successful!</h2>
          <p className="text-gray-700 mt-2">{message}</p>
          <a href="/auth" className="text-blue-500 underline mt-4 inline-block">Go to Login</a>
        </div>
      )}
      {status === "error" && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">❌ Verification Failed</h2>
          <p className="text-gray-700 mt-2">{message}</p>
        </div>
      )}
    </div>
  );
}
