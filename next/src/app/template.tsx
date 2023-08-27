"use client";
import { ReactNode } from "react";
import { SnackbarProvider } from "notistack";

interface TemplateProps {
  children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <div>
        <header className="p-4 bg-slate-100">
          <p className="text-slate-500">React Maps</p>
        </header>
        <div>{children}</div>
      </div>
    </SnackbarProvider>
  );
};

export default Template;
