import React from "react";
import Button from "./app/Button";

export interface RegisterComponent {
  [x: string]: {
    component: React.FC<any>;
    name: string;
    editor: {
      [x: string]: {
        name: string;
        type: "string" | "number" | "image" | "list" | "select" | "color";
        select?: Array<{
          value: string | number;
          name: string;
        }>;
      };
    };
  };
}

const registerComponents: RegisterComponent = {
  button: {
    component: Button,
    name: "Botão",
    editor: {
      title: {
        name: "Título",
        type: "string",
      },
      variant: {
        name: "Variante",
        type: "select",
        select: [
          {
            name: "Contained",
            value: "contained",
          },
          {
            name: "Outlined",
            value: "outlined",
          },
          {
            name: "Text",
            value: "text",
          },
        ],
      },
    },
  },
};

export default registerComponents;
