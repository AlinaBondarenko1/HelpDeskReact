import React from "react";
 import { useHistory } from "react-router-dom";
 import { useData } from "../DataContext";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from "../Components/PrimaryButton";
import { MainContainer } from "../Components/MainContainer";
import { Form } from "../Components/Form";
import { Input } from "../Components/Input";
import * as yup from "yup";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { parsePhoneNumberFromString } from 'libphonenumber-js'


const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Имя не должно содержать цифр")
    .required("Это обязательное поле"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
    middleName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers"),
    email: yup
    .string()
    .email("Некорректный формат")
    .required("Электронная почта является обязательным полем"),
});

export const Step1 = () => {
  const { setValues, data } = useData();
   const history = useHistory();
  const {register, handleSubmit, formState: {errors} , watch} = useForm({
     defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
     history.push("./step2");
    setValues(data);
  };
  const hasPhone = watch("hasPhone");

  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value)
    if(!phoneNumber){
      return value
    }
  
    return (
      phoneNumber.formatInternational() 
    );
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 1: Введите свои данные
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="firstName"
          type="text"
          label="First Name"
          {...register("firstName")} 
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          id="lastName"
          type="text"
          label="Last Name"
          {...register("lastName")} 
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <Input
          id="middleName"
          type="text"
          label="Middle Name"
          {...register("middleName")} 
          error={!!errors.middleName}
          helperText={errors?.middleName?.message}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          {...register("email")} 
          error={!!errors.email}
          helperText={errors?.email?.message}
          required
        />

        <FormControlLabel
          control={
            <Checkbox  
            defaultValue={data.hasPhone} 
            defaultChecked={data.hasPhone}
            color="primary"  
            {...register("hasPhone")}  
            />
          }
          label="Do you have a phone"
        />

      {hasPhone && (
          <Input
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            {...register("phoneNumber")} 
            onChange={(event) => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};