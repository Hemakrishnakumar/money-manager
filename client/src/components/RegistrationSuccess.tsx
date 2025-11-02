import React from 'react';
import { MailCheck } from 'lucide-react';

const RegistrationSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 text-center max-w-md">
        <div className="flex justify-center mb-4">
          <MailCheck className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Registration Successful 🎉
        </h1>
        <p className="text-gray-600 mb-4">
          Your account has been created successfully.
        </p>
        <p className="text-gray-700 font-medium">
          Please check your email and click on the verification link to activate your account.
        </p>
        <p className="text-sm text-gray-400 mt-6">
          Didn’t receive the email? Check your spam folder or try again later.
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
