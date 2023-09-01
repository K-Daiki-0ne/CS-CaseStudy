"use client";

import { useSearchParams } from "next/navigation";

export const getURLParam = (action: string): string => {

  const getParams = useSearchParams();

  let returnValue: string = '';
  switch (action) {
    case 'create':
      if (getParams.get('id') != null) {
        returnValue = getParams.get('id') as string;
      }
      break;
  }

  return returnValue;
}