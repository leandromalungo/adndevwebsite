"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardHero from "@/components/subscription/CardHero";
import SubscriptionForm from "@/components/subscription/SubscriptionForm";

const Page = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
          <CardHero /> 
          </div>
          <SubscriptionForm />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Page;
