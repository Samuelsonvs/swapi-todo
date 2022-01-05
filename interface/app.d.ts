import { Dispatch, SetStateAction } from "react";

export namespace App {
    interface ToDo { 
        [key: string]: {
            [key: string]: {
                description: string;
                status: string
            } 
        } | {}
      }
      
      interface ResponseData {
        [key: number] : {
            name: string
        }
      }
    
      interface SwapiState  {
        data: ResponseData | null;
        pending: boolean;
        error: boolean;
        todos: ToDo | null
      };
      
    interface Modal {
        isOpen: boolean;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
        handler?: any;
        children: JSX.Element;
        firstButtonMessage?: string;
        secondButtonMessage?: string;
        dialogTitleMessage?: string;
        dialogMessage?: string;
    }
}