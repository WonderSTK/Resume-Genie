"use client";

import { ReactNode, useEffect, useCallback } from "react";
import { createContext, useState, useContext } from "react";
import { fetchResume } from "@/lib/actions/resume.actions";

export interface FormData {
  resumeId?: string;
  userId?: string;
  title?: string;
  updatedAt?: Date;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  summary?: string;
  experience: {
    _id?: string;
    title?: string;
    companyName?: string;
    city?: string;
    state?: string;
    startDate?: string;
    endDate?: string;
    workSummary?: string;
  }[];
  education: {
    _id?: string;
    universityName?: string;
    degree?: string;
    major?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }[];
  skills: {
    _id?: string;
    name?: string;
    rating?: number;
  }[];
  themeColor?: string;
}

const FormContext = createContext(
  {} as {
    formData: FormData;
    handleInputChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleRichTextChange: (name: string, value: string) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  }
);

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const FormProvider = ({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) => {
  const [formData, setFormData] = useState<FormData>({
    education: [],
    experience: [],
    skills: [],
  });

  useEffect(() => {
    const loadResumeData = async () => {
      try {
        const resumeData = await fetchResume(params.id);
        setFormData(JSON.parse(resumeData));
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    loadResumeData();
  }, [params.id]);

  const debouncedSetFormData = useCallback(
    debounce((data: Partial<FormData>) => {
      setFormData((prev) => ({ ...prev, ...data }));
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    debouncedSetFormData(newFormData);
  };

  const handleRichTextChange = (name: string, value: string) => {
    const newFormData = {
      ...formData,
      [name]: value,
    };
    debouncedSetFormData(newFormData);
  };

  return (
    <FormContext.Provider
      value={{ formData, handleInputChange, handleRichTextChange, setFormData }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
