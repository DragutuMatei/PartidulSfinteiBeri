import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { FormErrorMessage, Select, Textarea } from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  type?: string;
  class?: string;
  textarea?: boolean;
  select?: boolean;
  arr?: any[];
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      {props.textarea ? (
        <Textarea id={props.name} {...field} placeholder={props.placeholder} />
      ) : props.select ? (
        <Select
          onChange={(e) => {
            console.log(e.target.value);
          }}
        >
          {props.arr?.map((a) => {
            return <option value={a.id}>{a.email}</option>;
          })}
        </Select>
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
