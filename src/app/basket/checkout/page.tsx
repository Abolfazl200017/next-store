"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography, FormControl, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactSelect from "react-select";
import useBasketStore from "@/store/basketStore";
import { redirect } from "next/navigation";
import { useSnackbar } from "@/providers/SnackbarProvider";

// Define the types for provinces and cities
type Province = { value: string; label: string };
type City = { value: string; label: string };

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("نام باید وارد شود"),
  lastname: Yup.string().required("نام خانوادگی باید وارد شود"),
  mobile: Yup.string().required("شماره همراه باید وارد شود").matches(/^[0-9]{11}$/, "شماره همراه وارد شده صحیح نمی‌باشد"),
  postcode: Yup.string().required("کد پستی باید وارد شود").matches(/^[0-9]{10}$/, "کد پستی صحیح نمی‌باشد"),
  address: Yup.string().required("آدرس باید وارد شود"),
  province: Yup.string().required("استان باید انتخاب شود"),
  city: Yup.string().required("شهر باید انتخاب شود"),
});

const CheckoutPage = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const { reset } = useBasketStore();
  const { showSnackbar } = useSnackbar();

  // Example list of provinces and cities
  const provinces: Province[] = [
    { value: "tehran", label: "تهران" },
    { value: "esfahan", label: "اصفهان" },
    { value: "mashhad", label: "مشهد" },
    // Add more provinces here
  ];

  const citiesByProvince: Record<string, City[]> = {
    tehran: [
      { value: "tehran-city", label: "تهران" },
      { value: "karaj", label: "کرج" },
    ],
    esfahan: [
      { value: "isfahan-city", label: "اصفهان" },
      { value: "kashan", label: "کاشان" },
    ],
    mashhad: [
      { value: "mashhad-city", label: "مشهد" },
      { value: "neishabur", label: "نیشابور" },
    ],
  };

  // React Hook Form setup
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      lastname: "",
      mobile: "",
      postcode: "",
      address: "",
      province: "",
      city: "",
    },
  });

  const onSubmit = (data: any) => {
    reset()
    showSnackbar('خرید شما با موفقیت ثبت شد', 'success');
    redirect('/')
  };

  const handleSelectProvince = (selectedOption: any) => {
    setSelectedProvince(selectedOption);
    setValue("province", selectedOption.value);
    // Reset city when province changes
    setSelectedCity(null);
    setValue("city", "");
  };

  const handleSelectCity = (selectedOption: any) => {
    setSelectedCity(selectedOption);
    setValue("city", selectedOption.value);
  };

  return (
    <Container maxWidth="sm" sx={{ my: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ pb: 2 }}>
        تکمیل خرید
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Input */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="نام"
              fullWidth
              {...field}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
              sx={{ mb: 3 }}
            />
          )}
        />

        {/* Last Name Input */}
        <Controller
          name="lastname"
          control={control}
          render={({ field }) => (
            <TextField
              label="نام خانوادگی"
              fullWidth
              {...field}
              error={!!errors.lastname}
              helperText={errors.lastname ? errors.lastname.message : ""}
              sx={{ mb: 3 }}
            />
          )}
        />

        {/* Mobile Input */}
        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <TextField
              label="شماره همراه"
              fullWidth
              {...field}
              error={!!errors.mobile}
              helperText={errors.mobile ? errors.mobile.message : ""}
              sx={{ mb: 3 }}
            />
          )}
        />

        {/* Postcode Input */}
        <Controller
          name="postcode"
          control={control}
          render={({ field }) => (
            <TextField
              label="کدپستی"
              fullWidth
              {...field}
              error={!!errors.postcode}
              helperText={errors.postcode ? errors.postcode.message : ""}
              sx={{ mb: 3 }}
            />
          )}
        />

        {/* Address Input */}
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              label="آدرس"
              fullWidth
              {...field}
              error={!!errors.address}
              helperText={errors.address ? errors.address.message : ""}
              sx={{ mb: 3 }}
            />
          )}
        />

        {/* Province Select */}
        <Controller
          name="province"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <ReactSelect
                {...field}
                value={selectedProvince}
                onChange={handleSelectProvince}
                options={provinces}
                getOptionLabel={(e: any) => e.label}
                getOptionValue={(e: any) => e.value}
                placeholder="انتخاب استان"
              />
              {errors.province && <Typography color="error">{errors.province.message}</Typography>}
            </FormControl>
          )}
        />

        {/* City Select */}
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <ReactSelect
                {...field}
                value={selectedCity}
                onChange={handleSelectCity}
                options={selectedProvince ? citiesByProvince[selectedProvince.value] : []}
                getOptionLabel={(e: any) => e.label}
                getOptionValue={(e: any) => e.value}
                placeholder="انتخاب شهر"
                isDisabled={!selectedProvince}
              />
              {errors.city && <Typography color="error">{errors.city.message}</Typography>}
            </FormControl>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          ثبت سفارش
        </Button>
      </form>
    </Container>
  );
};

export default CheckoutPage;
