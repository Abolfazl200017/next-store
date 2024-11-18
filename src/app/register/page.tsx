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
import { useSnackbar } from "@/providers/SnackbarProvider";

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
  const { showSnackbar } = useSnackbar();
  
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
      console.log(response)
      const token = response.data?.token;

      if (token){
        Cookies.set("authToken", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        showSnackbar("ورود با موفقیت انجام شد", "success");
        
        router.push("/");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error:any = response.error
      if (error.status === 401)
        showSnackbar("نام کاربری یا رمز عبور صحیح نمی‌باشد", "error");
      else if (response.error)
        showSnackbar("مشکلی در ورود پیش آمده لطفا مجددا تلاش کنید", "error");

        // console.log(response.error)
      // console.log("Login success:", response.data);
    } catch (error) {
      console.log("Login failed:", error);

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
                defaultValue="mor_2314"
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
                defaultValue="83r5^_"
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
