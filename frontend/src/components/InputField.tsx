import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { FormErrorMessage, Textarea } from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  type?: string;
  class?: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      {props.textarea ? (
        <Textarea id={props.name} {...field} placeholder={props.placeholder} />
      ) : (
        <Input
          className={props.class}
          id={props.name}
          type={props.type ? props.type : "text"}
          {...field}
          placeholder={props.placeholder}
        />
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
