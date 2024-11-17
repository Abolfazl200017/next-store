"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import { theme } from "@/theme/theme";
import { authService } from "@/services/api/authService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  username: yup.string().required("نام کاربری باید وارد شود"),
  password: yup
    .string()
    .min(6, "رمز عبور حداقل باید شامل ۶ حرف باشد")
    .required("رمز عبور باید وارد شود"),
});

interface FormValues {
  username: string;
  password: string;
}

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    if (loading)
      return
    setLoading(true);
    try {
      const response = await authService.register(data);
      const token = response.data?.token;

      if (token)
        Cookies.set("authToken", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

      router.push("/");
      console.log("Login success:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      position="relative"
    >
      {loading ? (
        <Box sx={{ width: "100%", position: "absolute", top: 0, right: 0 }}>
          <LinearProgress />
        </Box>
      ) : (
        <></>
      )}
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          boxShadow: 0,
          border: 1,
          borderColor: theme.palette.secondary.main,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ my: 3, width: 1, textAlign: "center" }}
          >
            ورود به حساب کاربری
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="نام کاربری"
                    variant="outlined"
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="رمز عبور"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Box>
            <CardActions>
              <Button type="submit" variant="contained" fullWidth>
                ورود
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
