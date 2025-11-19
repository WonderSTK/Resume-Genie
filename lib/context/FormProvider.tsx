"use client";

import { ReactNode, useEffect, useCallback } from "react";
import { createContext, useState, useContext } from "react";
import { fetchResume } from "../actions/resume.actions";

const FormContext = createContext({} as any);

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
  const [formData, setFormData] = useState({});

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
    debounce((data: any) => {
      setFormData(data);
    }, 500),
    []
  );

  const handleInputChange = (e: any) => {
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
