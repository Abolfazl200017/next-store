"use client";

import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationClient({ total, currentPage }: { total: number; currentPage: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const newParams = new URLSearchParams(searchParams as any);
    newParams.set("page", value.toString());
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <Pagination
      count={total}
      page={currentPage}
      size="large"
      shape="circular"
      color="secondary"
      onChange={handlePageChange}
      hideNextButton
      hidePrevButton
    />
  );
}
