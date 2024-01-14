import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { alpha, Typography, useMediaQuery, useTheme } from "@mui/material";
import ManageSearch from "../header/second-navbar/ManageSearch";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { useTranslation } from "react-i18next";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
import { Box } from "@mui/system";
import TrackParcelFromHomePage from "../parcel/TrackParcelFromHomePage";

const SearchWithTitle = (props) => {
  const moduleType = getCurrentModuleType();
  const { zoneid, token,query } = props;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const getBannerTexts = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        return {
          title: "Shop Local Stores",
          subTitle: "",
        };
      case ModuleTypes.PHARMACY:
        return {
          title: "Shop Local Pharmacy",
          subTitle: "",
        };
      case ModuleTypes.ECOMMERCE:
        return {
          title: "Shop Local Artisans",
          subTitle: "",
        };
      case ModuleTypes.FOOD:
        return {
          title: "Locally-made food delivered.",
          subTitle: "",
        };
      case ModuleTypes.PARCEL:
        return {
          title: "Track your Products",
          subTitle: "",
        };
      default:
        return {
          title: "",
          subTitle: "",
        };
    }
  };
  return (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="center"
      spacing={isSmall ? 1 : 3}
      p={isSmall ? "25px" : "20px"}
    >
      <CustomStackFullWidth
        alignItems="center"
        justifyContent="center"
        spacing={1.5}
      >
        <Typography
          variant={isSmall ? "h6" : "h5"}
          textAlign="center"
          fontWeight="600"
          lineHeight="33.18px"
        >
          {t(getBannerTexts().title)}
        </Typography>
        <Typography
          variant={isSmall ? "subtitle2" : "subtitle1"}
          textAlign="center"
          sx={{ color: (theme) => theme.palette.neutral[400] }}
          fontWeight="400"
          lineHeight="18.75px"
        >
          {t(getBannerTexts().subTitle)}
        </Typography>
      </CustomStackFullWidth>
      {moduleType !== "parcel" ? (
        <ManageSearch
          zoneid={zoneid}
          token={token}
          maxwidth="false"
          fullWidth
          query={query}
        />
      ) : (
        <TrackParcelFromHomePage />
      )}
    </CustomStackFullWidth>
  );
};

export default SearchWithTitle;
