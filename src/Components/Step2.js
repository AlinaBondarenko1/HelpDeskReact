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
import { FileInput } from "../Components/FileInput";
import * as yup from "yup";
const schema = yup.object().shape({

});

export const Step2 = () => {
  const { setValues, data } = useData();
  
  const history = useHistory();
  const {register, handleSubmit, control} = useForm({
    defaultValues: { 
      title: data.title,
      description: data.description,
      files: data.files
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
     history.push("./result");
    setValues(data);
    console.log(data)
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2: Введите описание дефекта
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          type="text"
          label="Title"
          {...register("title")} 
        />
      <Input
          id="description"
          type="text"
          label="Description"
          {...register("description")} 
        />
        <PrimaryButton>Next</PrimaryButton>

        <FileInput name="files" control={control} />
      </Form>
    </MainContainer>
  );
};