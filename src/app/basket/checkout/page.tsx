"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  Autocomplete,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useBasketStore from "@/store/basketStore";
import { redirect } from "next/navigation";
import { useSnackbar } from "@/providers/SnackbarProvider";
import MapComponent from "./Map";

type Province = { value: string; label: string };
type City = { value: string; label: string };

const validationSchema = Yup.object({
  name: Yup.string().required("نام باید وارد شود"),
  lastname: Yup.string().required("نام خانوادگی باید وارد شود"),
  mobile: Yup.string()
    .required("شماره همراه باید وارد شود")
    .matches(/^[0-9]{11}$/, "شماره همراه وارد شده صحیح نمی‌باشد"),
  email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  postcode: Yup.string()
    .required("کد پستی باید وارد شود")
    .matches(/^[0-9]{10}$/, "کد پستی صحیح نمی‌باشد"),
  address: Yup.string()
    .required("آدرس مورد نیاز است")
    .min(10, "آدرس باید حداقل 10 کاراکتر باشد")
    .max(200, "آدرس نمی‌تواند بیشتر از 200 کاراکتر باشد"),
  province: Yup.object()
    .required("استان باید انتخاب شود")
    .nullable()
    .notOneOf([null], "استان نمی‌تواند خالی باشد"), // Disallow null value
  city: Yup.object()
    .required("شهر باید انتخاب شود")
    .nullable()
    .notOneOf([null], "شهر نمی‌تواند خالی باشد"),
});

const CheckoutPage = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [cities, setCities] = useState<City[]>([]);
  const { reset } = useBasketStore();
  const { showSnackbar } = useSnackbar();
  const [hydrated, setHydrated] = useState(false);
  const handleMap = (data: any) => {
    setValue("address", data.address);
    trigger("address"); // Trigger validation for the updated field
  };
  

  // Example provinces and cities
  const provinces: Province[] = [
    { value: "tehran", label: "تهران" },
    { value: "esfahan", label: "اصفهان" },
    { value: "mashhad", label: "مشهد" },
    { value: "mazandaran", label: "مازندران" },
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
    mazandaran: [
      { value: "babol", label: "بابل" },
      { value: "amol", label: "آمل" },
    ],
  };

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      lastname: "",
      mobile: "",
      email: "",
      postcode: "",
      address: "",
      province: null,
      city: null,
    },
  });

  // Ensure hydration consistency
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // Prevent SSR rendering

  const handleProvinceChange = (selectedOption: Province | null) => {
    setSelectedProvince(selectedOption);
    setValue("province", selectedOption);
    setCities(
      selectedOption ? citiesByProvince[selectedOption.value] || [] : []
    );
    setValue("city", null); // Reset city when province changes
    trigger("province");
  };

  const handleCityChange = (selectedOption: City | null) => {
    setValue("city", selectedOption);
    trigger("city");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    reset();
    showSnackbar("خرید شما با موفقیت ثبت شد", "success");
    redirect("/");
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

        {/* Email Input */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              label="ایمیل"
              fullWidth
              {...field}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              sx={{ mb: 3 }}
            />
          )}
        />

        {/* Phone Number Input */}
        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <TextField
              label="شماره تلفن"
              fullWidth
              {...field}
              error={!!errors.mobile}
              helperText={errors.mobile ? errors.mobile.message : ""}
              sx={{ mb: 3 }}
            />
          )}
        />
        <Controller
          name="province"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Autocomplete
                {...field}
                value={selectedProvince} // Correct type: Province | null
                onChange={(_, value: Province | null) =>
                  handleProvinceChange(value)
                }
                options={provinces}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) =>
                  option.value === value?.value
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="استان"
                    error={!!errors.province}
                    helperText={errors.province ? errors.province.message : ""}
                  />
                )}
              />
            </FormControl>
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Autocomplete
                {...field}
                value={field.value as City | null} // Ensure value matches City | null
                onChange={(_, value: City | null) => handleCityChange(value)}
                options={cities}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) =>
                  option.value === value?.value
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="شهر"
                    error={!!errors.city}
                    helperText={errors.city ? errors.city.message : ""}
                  />
                )}
                disabled={!selectedProvince}
              />
            </FormControl>
          )}
        />

        <Controller
          name="postcode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="کد پستی"
              fullWidth
              error={!!errors.postcode}
              helperText={errors.postcode ? errors.postcode.message : ""}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="آدرس"
              fullWidth
              multiline
              rows={4} // Set the number of rows for the TextArea
              error={!!errors.address} // Show error if validation fails
              helperText={errors.address ? errors.address.message : ""} // Show validation message
              sx={{ mb: 3 }}
            />
          )}
        />

        <Box sx={{ width: 1, aspectRatio: '4/3', overflow: 'hidden', my: 3 }}>
          <MapComponent handleMap={handleMap} />
        </Box>

        <Button
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: 1 }}
        >
          ثبت سفارش
        </Button>
      </form>
    </Container>
  );
};

export default CheckoutPage;
