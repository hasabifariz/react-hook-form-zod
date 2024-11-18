import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {Button} from "@/components/ui/button";

// Define a complex Zod schema for login validation
const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username or email is required.")
    .regex(
      /^(?=.{1,})([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9]+)$/,
      "Enter a valid username or email."
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must have at least one uppercase letter.")
    .regex(/\d/, "Password must contain at least one number."),
  rememberMe: z.boolean().optional(),
});

function LoginForm() {
  // Initialize form with useForm and Zod validation resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Login data:", data);
    // Perform login action, e.g., an API call
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Username or Email Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm font-medium text-gray-700">
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
